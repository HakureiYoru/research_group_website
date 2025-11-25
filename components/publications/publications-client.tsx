"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Publication } from "@/types";
import FilterBar from "./filter-bar";
import PublicationCard from "./publication-card";
import EmptyState from "@/components/ui/empty-state";
import Pagination from "@/components/ui/pagination";

interface PublicationsClientProps {
  publications: Publication[];
  years: string[];
  authors: string[];
}

const ITEMS_PER_PAGE = 10;

export default function PublicationsClient({
  publications,
  years,
  authors,
}: PublicationsClientProps) {
  const searchParams = useSearchParams();
  const initialAuthor = searchParams.get("author");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState(
    () => initialAuthor ?? "all"
  );
  const [sortBy, setSortBy] = useState("year-desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSelectedAuthor(initialAuthor ?? "all");
    setCurrentPage(1);
  }, [initialAuthor]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, selectedAuthor, sortBy]);

  const filteredPublications = useMemo(() => {
    let filtered = [...publications];

    if (selectedYear !== "all") {
      filtered = filtered.filter((pub) => pub.year === selectedYear);
    }

    if (selectedAuthor !== "all") {
      const normalizedAuthor = selectedAuthor.toLowerCase();
      filtered = filtered.filter((pub) =>
        pub.authors.some((author) =>
          author.toLowerCase().includes(normalizedAuthor)
        )
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return b.year.localeCompare(a.year);
        case "year-asc":
          return a.year.localeCompare(b.year);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [publications, selectedAuthor, selectedYear, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPublications.length / ITEMS_PER_PAGE)
  );

  const currentPublications = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPublications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredPublications]);

  const handleReset = () => {
    setSelectedYear("all");
    setSelectedAuthor("all");
    setSortBy("year-desc");
    setCurrentPage(1);
  };

  return (
    <>
      <p className="text-center text-gray-600 mb-8">
        共 {publications.length} 篇发表，当前显示 {filteredPublications.length}{" "}
        篇
      </p>

      <FilterBar
        years={years}
        authors={authors}
        selectedYear={selectedYear}
        selectedAuthor={selectedAuthor}
        sortBy={sortBy}
        onYearChange={setSelectedYear}
        onAuthorChange={setSelectedAuthor}
        onSortChange={setSortBy}
        onReset={handleReset}
      />

      {currentPublications.length === 0 ? (
        <EmptyState message="没有找到符合条件的发表记录" />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 mb-8">
            {currentPublications.map((pub, index) => (
              <PublicationCard key={index} publication={pub} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
