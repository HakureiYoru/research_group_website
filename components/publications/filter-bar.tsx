'use client';

interface FilterBarProps {
  years: string[];
  authors: string[];
  selectedYear: string;
  selectedAuthor: string;
  sortBy: string;
  onYearChange: (year: string) => void;
  onAuthorChange: (author: string) => void;
  onSortChange: (sortBy: string) => void;
  onReset: () => void;
}

export default function FilterBar({
  years,
  authors,
  selectedYear,
  selectedAuthor,
  sortBy,
  onYearChange,
  onAuthorChange,
  onSortChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择年份
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">所有年份</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Author Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            选择作者
          </label>
          <select
            value={selectedAuthor}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">所有作者</option>
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            排序方式
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="year-desc">年份（新到旧）</option>
            <option value="year-asc">年份（旧到新）</option>
            <option value="title-asc">标题（A-Z）</option>
            <option value="title-desc">标题（Z-A）</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            重置筛选
          </button>
        </div>
      </div>
    </div>
  );
}


