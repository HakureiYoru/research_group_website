import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";
import { Publication } from "@/types";

const DATA_PATH = path.join(process.cwd(), "data", "publications.json");

const readPublications = cache(async (): Promise<Publication[]> => {
  const fileContents = await fs.readFile(DATA_PATH, "utf8");
  const parsed = JSON.parse(fileContents) as Publication[];
  return parsed.map((pub) => ({
    ...pub,
    year: typeof pub.year === "string" ? parseInt(pub.year, 10) : pub.year,
  }));
});

async function loadPublications(fallback: Publication[] = []): Promise<Publication[]> {
  try {
    return await readPublications();
  } catch (error) {
    console.error(`Error loading publications.json:`, error);
    return fallback;
  }
}

export async function getPublicationsData(): Promise<Publication[]> {
  return loadPublications([]);
}

export async function getPublicationsByAuthor(author: string): Promise<Publication[]> {
  const publications = await getPublicationsData();
  const normalized = author.toLowerCase();
  return publications.filter((pub) =>
    pub.authors.some((item) => item.name.toLowerCase().includes(normalized)),
  );
}

export async function getPublicationsByYear(year: number): Promise<Publication[]> {
  const publications = await getPublicationsData();
  return publications.filter((pub) => pub.year === year);
}

export function extractPublicationFacets(publications: Publication[]) {
  const years = new Set<number>();
  const authors = new Set<string>();

  publications.forEach((pub) => {
    years.add(pub.year);
    pub.authors.forEach((author) => authors.add(author.name.trim()));
  });

  return {
    years: Array.from(years).sort((a, b) => b - a),
    authors: Array.from(authors).sort(),
  };
}

export function groupPublicationsByYear(publications: Publication[]) {
  const grouped = new Map<number | string, Publication[]>();
  publications.forEach((pub) => {
    const bucket = pub.year ?? "Unknown";
    grouped.set(bucket, [...(grouped.get(bucket) || []), pub]);
  });

  const normalizeYear = (value: number | string) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : -Infinity;
  };

  return Array.from(grouped.entries())
    .sort((a, b) => normalizeYear(b[0]) - normalizeYear(a[0]))
    .map(([year, items]) => ({
      year: String(year),
      items: items.sort((a, b) => (b.citationCount || 0) - (a.citationCount || 0)),
    }));
}
