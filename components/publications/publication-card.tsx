import { Publication } from '@/types';

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 fade-in">
      {/* Year Badge */}
      <div className="flex justify-between items-start mb-3">
        <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
          {publication.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 text-gray-800">
        {publication.link ? (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h3>

      {/* Authors */}
      <p className="text-sm text-gray-600 mb-3">
        <strong>作者：</strong>
        {publication.authors.join(', ')}
      </p>

      {/* Description */}
      {publication.description && (
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {publication.description}
        </p>
      )}

      {/* Link Button */}
      {publication.link && (
        <a
          href={publication.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary-dark font-medium text-sm"
        >
          查看详情
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </div>
  );
}


