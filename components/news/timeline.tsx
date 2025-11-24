import { NewsYear } from '@/types';
import NewsItem from './news-item';

interface TimelineProps {
  newsData: NewsYear[];
}

export default function Timeline({ newsData }: TimelineProps) {
  return (
    <div className="relative py-8">
      {/* Timeline Line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-secondary transform -translate-x-1/2" />

      {/* News by Year */}
      {newsData.map((yearData) => (
        <div key={yearData.year} className="mb-12">
          {/* Year Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-secondary text-white text-2xl font-bold py-2 px-6 rounded-full shadow-lg">
              {yearData.year}
            </div>
          </div>

          {/* News Items */}
          <div className="space-y-8">
            {yearData.items.map((item, index) => (
              <NewsItem key={index} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


