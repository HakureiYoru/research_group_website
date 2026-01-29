"""
Build-time publication aggregator.

This script pulls publications from OpenAlex (primary) and enriches them with
Semantic Scholar (secondary), merges manual curation, and writes the combined
result to data/publications.json for the Next.js static build.
"""

from __future__ import annotations

import json
import logging
import os
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Set
from urllib.parse import quote

import requests
import yaml
from tenacity import retry, retry_if_exception_type, stop_after_attempt, wait_exponential

ROOT_DIR = Path(__file__).resolve().parent
DATA_DIR = ROOT_DIR / "data"
OUTPUT_PATH = DATA_DIR / "publications.json"
MANUAL_FILE = Path(os.getenv("MANUAL_PUBS_FILE", DATA_DIR / "manual_pubs.yaml"))
QUERIES_FILE = Path(os.getenv("OPENALEX_QUERIES_FILE", DATA_DIR / "openalex_queries.json"))

OPENALEX_BASE = "https://api.openalex.org"
SEMANTIC_SCHOLAR_BASE = "https://api.semanticscholar.org/graph/v1"
DEFAULT_MAILTO = os.getenv("OPENALEX_MAILTO", "lab@edu.cn")
SEMANTIC_SCHOLAR_API_KEY = os.getenv("SEMANTIC_SCHOLAR_API_KEY")
UNPAYWALL_EMAIL = os.getenv("UNPAYWALL_EMAIL", DEFAULT_MAILTO)


def normalize_name(name: str) -> str:
    return " ".join(name.lower().strip().replace(",", " ").split())


def normalize_doi(doi: str) -> str:
    doi = doi.strip().lower()
    prefixes = ("https://doi.org/", "http://doi.org/", "doi:")
    for prefix in prefixes:
        if doi.startswith(prefix):
            doi = doi[len(prefix) :]
            break
    return doi


def load_manual_entries(path: Path) -> List[Dict[str, Any]]:
    if not path.exists():
        logging.info("Manual publications file %s not found, skipping manual merge.", path)
        return []

    with path.open("r", encoding="utf-8") as handle:
        data = yaml.safe_load(handle) or []
        if not isinstance(data, list):
            logging.warning("manual_pubs.yaml must contain a list; got %s", type(data))
            return []
        return data


def load_openalex_queries(path: Path) -> List[str]:
    if not path.exists():
        return []
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    if isinstance(data, list):
        return [str(item) for item in data if item]
    logging.warning("Expected a list in %s, got %s", path, type(data))
    return []


def best_pdf_url(work: Dict[str, Any]) -> Optional[str]:
    oa = work.get("best_oa_location") or {}
    return oa.get("url_for_pdf") or oa.get("url")


def resolve_venue(work: Dict[str, Any]) -> Optional[str]:
    primary = (work.get("primary_location") or {}).get("source") or {}
    host_venue = work.get("host_venue") or {}
    return primary.get("display_name") or host_venue.get("display_name")


def fetch_openalex_query(raw_url: str, mailto: str) -> Iterable[Dict[str, Any]]:
    from urllib.parse import urlsplit, urlunsplit, parse_qsl, urlencode

    parts = urlsplit(raw_url)
    base_url = urlunsplit((parts.scheme or "https", parts.netloc or "api.openalex.org", parts.path or "/works", "", ""))
    query_params = dict(parse_qsl(parts.query, keep_blank_values=True))

    # Normalize params to cursor-based paging and defaults.
    query_params.pop("page", None)
    query_params.setdefault("cursor", "*")
    query_params.setdefault("per_page", "200")
    query_params.setdefault("sort", "cited_by_count:desc")
    query_params.setdefault("mailto", mailto)

    headers = {"User-Agent": f"research-group-fetcher (mailto:{query_params['mailto']})"}

    page_count = 0
    total_fetched = 0
    while query_params.get("cursor"):
        response = requests.get(base_url, params=query_params, headers=headers, timeout=30)
        response.raise_for_status()
        payload = response.json()
        results = payload.get("results", [])
        page_count += 1
        total_fetched += len(results)
        
        if results:
            logging.info("  📄 Page %d: fetched %d works (total: %d)", page_count, len(results), total_fetched)
        
        for work in results:
            yield work
        
        query_params["cursor"] = payload.get("meta", {}).get("next_cursor")
    
    logging.info("  ✓ Completed: fetched %d works total from this query", total_fetched)


def extract_publication(work: Dict[str, Any]) -> Dict[str, Any]:
    doi = work.get("doi")
    links: Dict[str, Optional[str]] = {
        "doi": doi,
        "openAlexId": work.get("id"),
        "landingUrl": (work.get("primary_location") or {}).get("landing_page_url") or (work.get("ids") or {}).get("doi"),
        "pdfUrl": best_pdf_url(work),
        "codeUrl": None,
    }

    authors = []
    for authorship in work.get("authorships", []):
        name = authorship.get("author", {}).get("display_name") or authorship.get("display_name")
        if not name:
            continue
        authors.append(
            {
                "name": name,
                "orcid": authorship.get("author", {}).get("orcid"),
                "isGroupMember": False,
            }
        )

    return {
        "id": work.get("id"),
        "title": work.get("title"),
        "year": work.get("publication_year"),
        "venue": resolve_venue(work),
        "type": work.get("type"),
        "tldr": None,
        "citationCount": work.get("cited_by_count"),
        "openAccess": bool(work.get("open_access", {}).get("is_oa") or links["pdfUrl"]),
        "authors": authors,
        "links": links,
        "source": "openalex",
    }


def merge_authors(target: List[Dict[str, Any]], incoming: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    for author in incoming:
        normalized = normalize_name(author.get("name", ""))
        existing = next((a for a in target if normalize_name(a.get("name", "")) == normalized), None)
        if existing:
            existing["isGroupMember"] = existing.get("isGroupMember") or author.get("isGroupMember")
            if author.get("orcid") and not existing.get("orcid"):
                existing["orcid"] = author["orcid"]
        else:
            target.append(author)
    return target


def merge_links(target: Dict[str, Any], incoming: Dict[str, Any], prefer_incoming: bool = False) -> Dict[str, Any]:
    for key, value in incoming.items():
        if value and (prefer_incoming or not target.get(key)):
            target[key] = value
    return target


class PublicationStore:
    def __init__(self) -> None:
        self._by_key: Dict[str, Dict[str, Any]] = {}

    def _keys_for(self, publication: Dict[str, Any]) -> List[str]:
        keys = []
        doi = publication.get("links", {}).get("doi")
        if doi:
            keys.append(f"doi:{normalize_doi(doi)}")
        openalex_id = publication.get("id") or publication.get("links", {}).get("openAlexId")
        if openalex_id:
            keys.append(f"id:{openalex_id}")
        if not keys:
            title = normalize_name(publication.get("title", "untitled"))
            year = publication.get("year") or "na"
            keys.append(f"title:{title}:{year}")
        return keys

    def add_or_merge(self, publication: Dict[str, Any], prefer_incoming: bool = False) -> None:
        keys = self._keys_for(publication)
        existing = None
        for key in keys:
            if key in self._by_key:
                existing = self._by_key[key]
                break

        if existing:
            self._merge(existing, publication, prefer_incoming)
        else:
            for key in keys:
                self._by_key[key] = publication

    def _merge(self, target: Dict[str, Any], incoming: Dict[str, Any], prefer_incoming: bool = False) -> None:
        for field in ["title", "venue", "type", "tldr", "manualNote"]:
            if incoming.get(field) and (prefer_incoming or not target.get(field)):
                target[field] = incoming[field]

        # Year: keep the most recent if one is missing.
        if incoming.get("year") and (prefer_incoming or not target.get("year")):
            target["year"] = incoming["year"]

        # Citation counts: prefer the richer or newer source.
        if incoming.get("citationCount") and (
            target.get("citationCount") is None
            or incoming["citationCount"] > target.get("citationCount", 0)
            or prefer_incoming
        ):
            target["citationCount"] = incoming["citationCount"]

        target["openAccess"] = target.get("openAccess") or incoming.get("openAccess")
        target["authors"] = merge_authors(target.get("authors", []), incoming.get("authors", []))
        target["links"] = merge_links(target.get("links", {}), incoming.get("links", {}), prefer_incoming)
        target["source"] = "merged" if target.get("source") != incoming.get("source") else target.get("source")

    @property
    def publications(self) -> List[Dict[str, Any]]:
        unique = list({id(pub): pub for pub in self._by_key.values()}.values())
        return sorted(unique, key=lambda p: (p.get("year") or 0, p.get("title") or ""), reverse=True)


@retry(
    wait=wait_exponential(multiplier=1, min=1, max=8),
    stop=stop_after_attempt(4),
    retry=retry_if_exception_type(requests.RequestException),
    reraise=False,
)
def fetch_semantic_scholar(doi: str) -> Optional[Dict[str, Any]]:
    headers = {"User-Agent": "research-group-fetcher"}
    if SEMANTIC_SCHOLAR_API_KEY:
        headers["x-api-key"] = SEMANTIC_SCHOLAR_API_KEY

    url = f"{SEMANTIC_SCHOLAR_BASE}/paper/DOI:{quote(doi)}"
    params = {"fields": "title,tldr,citationCount"}
    response = requests.get(url, headers=headers, params=params, timeout=20)
    if response.status_code == 404:
        return None
    response.raise_for_status()
    return response.json()


def apply_semantic_scholar(store: PublicationStore) -> None:
    seen = set()
    total_pubs = len(store.publications)
    processed = 0
    enriched_count = 0
    
    for publication in store.publications:
        doi = publication.get("links", {}).get("doi")
        if not doi:
            continue
        normalized = normalize_doi(doi)
        if normalized in seen:
            continue
        seen.add(normalized)
        processed += 1

        if processed % 10 == 0 or processed == len(seen):
            logging.info("  📊 Progress: %d/%d publications checked", processed, len(seen))

        try:
            enriched = fetch_semantic_scholar(doi)
        except requests.RequestException as exc:
            logging.warning("  ⚠️  Semantic Scholar request failed for %s: %s", doi, exc)
            continue

        if not enriched:
            continue

        enriched_count += 1
        incoming = {
            "id": publication.get("id"),
            "title": publication.get("title"),
            "year": publication.get("year"),
            "tldr": (enriched.get("tldr") or {}).get("text"),
            "citationCount": enriched.get("citationCount"),
            "authors": publication.get("authors", []),
            "links": publication.get("links", {}),
            "source": "semantic-scholar",
        }
        store.add_or_merge(incoming, prefer_incoming=True)
    
    logging.info("  ✓ Enriched %d publications with Semantic Scholar data", enriched_count)


def fetch_unpaywall_pdf(doi: str) -> Optional[str]:
    if not doi:
        return None
    normalized = normalize_doi(doi)
    url = f"https://api.unpaywall.org/v2/{quote(normalized)}"
    params = {"email": UNPAYWALL_EMAIL}
    response = requests.get(url, params=params, timeout=15)
    if response.status_code == 404:
        return None
    response.raise_for_status()
    payload = response.json()
    best = payload.get("best_oa_location") or {}
    return best.get("url_for_pdf") or best.get("url")


def apply_unpaywall(store: PublicationStore) -> None:
    processed = 0
    found_pdfs = 0
    total_without_pdf = sum(1 for p in store.publications if not p.get("links", {}).get("pdfUrl") and p.get("links", {}).get("doi"))
    
    if total_without_pdf == 0:
        logging.info("  ℹ️  All publications already have PDF URLs, skipping Unpaywall")
        return
    
    logging.info("  🔍 Checking %d publications without PDFs", total_without_pdf)
    
    for publication in store.publications:
        links = publication.get("links", {})
        if links.get("pdfUrl"):
            continue
        doi = links.get("doi")
        if not doi:
            continue
        
        processed += 1
        if processed % 10 == 0 or processed == total_without_pdf:
            logging.info("  📊 Progress: %d/%d checked, %d PDFs found", processed, total_without_pdf, found_pdfs)
        
        try:
            pdf_url = fetch_unpaywall_pdf(doi)
        except requests.RequestException as exc:
            logging.warning("  ⚠️  Unpaywall request failed for %s: %s", doi, exc)
            continue
        if pdf_url:
            found_pdfs += 1
            links["pdfUrl"] = pdf_url
            publication["links"] = links
            publication["openAccess"] = True
            if not publication.get("source"):
                publication["source"] = "unpaywall"
    
    logging.info("  ✓ Found %d PDF URLs via Unpaywall", found_pdfs)


def apply_manual_entries(store: PublicationStore, manual_entries: List[Dict[str, Any]]) -> None:
    if not manual_entries:
        logging.info("  ℹ️  No manual entries to merge")
        return
    
    logging.info("  📝 Merging %d manual entr%s", len(manual_entries), "y" if len(manual_entries) == 1 else "ies")
    
    for entry in manual_entries:
        links = {
            "doi": entry.get("doi"),
            "openAlexId": entry.get("openalex_id"),
            "landingUrl": entry.get("landing_url"),
            "pdfUrl": entry.get("pdf_url"),
            "codeUrl": entry.get("code_url"),
        }
        authors = [
            {
                "name": author.get("name"),
                "orcid": author.get("orcid"),
                "isGroupMember": author.get("is_group_member", False),
            }
            for author in entry.get("authors", [])
            if author.get("name")
        ]
        publication = {
            "id": entry.get("id") or entry.get("openalex_id") or entry.get("doi"),
            "title": entry.get("title"),
            "year": entry.get("year"),
            "venue": entry.get("venue"),
            "tldr": entry.get("tldr") or entry.get("summary"),
            "citationCount": entry.get("citation_count"),
            "openAccess": bool(entry.get("pdf_url")),
            "authors": authors,
            "links": links,
            "source": "manual",
            "manualNote": entry.get("notes"),
        }
        store.add_or_merge(publication, prefer_incoming=True)
    
    logging.info("  ✓ Successfully merged %d manual entr%s", len(manual_entries), "y" if len(manual_entries) == 1 else "ies")


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    logging.info("=" * 60)
    logging.info("🚀 Starting publication fetcher")
    logging.info("=" * 60)

    queries = load_openalex_queries(QUERIES_FILE)
    manual_entries = load_manual_entries(MANUAL_FILE)

    logging.info("📋 Found %d OpenAlex quer%s to process", len(queries), "y" if len(queries) == 1 else "ies")
    if manual_entries:
        logging.info("📋 Found %d manual entr%s to merge", len(manual_entries), "y" if len(manual_entries) == 1 else "ies")

    store = PublicationStore()

    # Fetch publications from OpenAlex queries
    logging.info("")
    logging.info("📥 Stage 1/4: Fetching from OpenAlex queries")
    for idx, raw_url in enumerate(queries, 1):
        logging.info("🔍 Query %d/%d: %s", idx, len(queries), raw_url[:100] + "..." if len(raw_url) > 100 else raw_url)
        try:
            query_count = 0
            for work in fetch_openalex_query(raw_url, DEFAULT_MAILTO):
                store.add_or_merge(extract_publication(work))
                query_count += 1
        except requests.RequestException as exc:
            logging.warning("❌ OpenAlex fetch failed for query %d: %s", idx, exc)
    
    logging.info("✅ Stage 1 complete: %d unique publications in store", len(store.publications))

    logging.info("")
    logging.info("🔬 Stage 2/4: Enriching with Semantic Scholar")
    apply_semantic_scholar(store)
    logging.info("✅ Stage 2 complete")

    logging.info("")
    logging.info("🔓 Stage 3/4: Finding PDFs via Unpaywall")
    apply_unpaywall(store)
    logging.info("✅ Stage 3 complete")

    logging.info("")
    logging.info("📝 Stage 4/4: Merging manual entries")
    apply_manual_entries(store, manual_entries)
    logging.info("✅ Stage 4 complete")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with OUTPUT_PATH.open("w", encoding="utf-8") as handle:
        json.dump(store.publications, handle, ensure_ascii=False, indent=2)
    
    logging.info("")
    logging.info("=" * 60)
    logging.info("✨ Success! Wrote %d publications to %s", len(store.publications), OUTPUT_PATH)
    logging.info("=" * 60)


if __name__ == "__main__":
    main()
