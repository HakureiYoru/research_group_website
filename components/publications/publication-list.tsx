"use client";

import { useState, useMemo } from "react";
import EmptyState from "@/components/ui/empty-state";
import PublicationCard from "./publication-card";
import { Publication } from "@/types";

interface PublicationGroup {
  year: string;
  items: Publication[];
}

interface PublicationListProps {
  groups: PublicationGroup[];
}

export default function PublicationList({ groups }: PublicationListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = useMemo(() => {
    if (!searchTerm.trim()) return groups;

    const term = searchTerm.toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.title.toLowerCase().includes(term) ||
            item.venue?.toLowerCase().includes(term) ||
            item.authors.some((author) => author.name.toLowerCase().includes(term))
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, searchTerm]);

  if (!groups.length) {
    return (
      <EmptyState message="暂无可展示的出版物，请先运行 fetcher.py 生成数据。" />
    );
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="搜索标题、作者或期刊..."
          className="block w-full pl-11 pr-4 py-3 border border-slate-200 rounded-2xl bg-white/80 backdrop-blur shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 placeholder:text-slate-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {filteredGroups.length > 0 ? (
        <div className="space-y-10">
          {filteredGroups.map((group) => (
            <section key={group.year} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-3xl font-bold text-primary">{group.year}</h2>
                <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600">
                  {group.items.length} 篇
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {group.items.map((publication) => (
                  <PublicationCard key={publication.id} publication={publication} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
            <svg
              className="h-8 w-8 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-slate-500 text-lg">没有找到匹配 &ldquo;{searchTerm}&rdquo; 的结果</p>
          <button
            onClick={() => setSearchTerm("")}
            className="mt-4 text-primary font-medium hover:underline"
          >
            清除搜索
          </button>
        </div>
      )}
    </div>
  );
}
