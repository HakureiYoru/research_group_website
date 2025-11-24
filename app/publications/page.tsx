'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Publication } from '@/types';
import PublicationCard from '@/components/publications/publication-card';
import FilterBar from '@/components/publications/filter-bar';
import Pagination from '@/components/ui/pagination';
import Loader from '@/components/ui/loader';
import EmptyState from '@/components/ui/empty-state';

function PublicationsContent() {
  const searchParams = useSearchParams();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [sortBy, setSortBy] = useState('year-desc');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/publications.json');
        const data = await response.json();
        setPublications(data);

        // Extract years and authors
        const yearsSet = new Set<string>();
        const authorsSet = new Set<string>();
        data.forEach((pub: Publication) => {
          yearsSet.add(pub.year);
          pub.authors.forEach((author: string) => authorsSet.add(author.trim()));
        });
        setYears(Array.from(yearsSet).sort((a, b) => b.localeCompare(a)));
        setAuthors(Array.from(authorsSet).sort());

        // Check for author from URL params
        const authorParam = searchParams.get('author');
        if (authorParam) {
          setSelectedAuthor(authorParam);
        }
      } catch (error) {
        console.error('Error loading publications:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  // Filter and sort publications
  useEffect(() => {
    let filtered = [...publications];

    // Apply filters
    if (selectedYear !== 'all') {
      filtered = filtered.filter((pub) => pub.year === selectedYear);
    }
    if (selectedAuthor !== 'all') {
      filtered = filtered.filter((pub) =>
        pub.authors.some((author) =>
          author.toLowerCase().includes(selectedAuthor.toLowerCase())
        )
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'year-desc':
          return b.year.localeCompare(a.year);
        case 'year-asc':
          return a.year.localeCompare(b.year);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    setFilteredPublications(filtered);
    setCurrentPage(1);
  }, [publications, selectedYear, selectedAuthor, sortBy]);

  const handleReset = () => {
    setSelectedYear('all');
    setSelectedAuthor('all');
    setSortBy('year-desc');
  };

  // Pagination
  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPublications = filteredPublications.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-12 text-primary">
            学术发表
          </h1>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          学术发表
        </h1>

        <p className="text-center text-gray-600 mb-8">
          共 {publications.length} 篇发表，当前显示 {filteredPublications.length} 篇
        </p>

        {/* Filter Bar */}
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

        {/* Publications Grid */}
        {currentPublications.length === 0 ? (
          <EmptyState message="没有找到符合条件的发表记录" />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 mb-8">
              {currentPublications.map((pub, index) => (
                <PublicationCard key={index} publication={pub} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function PublicationsPage() {
  return (
    <Suspense fallback={<Loader />}>
      <PublicationsContent />
    </Suspense>
  );
}


