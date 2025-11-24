import { NewsItem as NewsItemType } from '@/types';

interface NewsItemProps {
  item: NewsItemType;
}

const categoryStyles = {
  research: 'bg-success',
  award: 'bg-warning text-gray-800',
  activity: 'bg-info',
};

const categoryLabels = {
  research: '研究成果',
  award: '资助与奖项',
  activity: '活动与演讲',
};

export default function NewsItem({ item }: NewsItemProps) {
  return (
    <div className="relative md:w-[calc(50%-2rem)] md:even:ml-auto fade-in">
      {/* Timeline Dot */}
      <div className="hidden md:block absolute top-6 -right-[calc(50%+2rem)] w-4 h-4 bg-secondary rounded-full border-4 border-white shadow" />
      <div className="hidden md:block absolute top-6 -left-[calc(50%+2rem)] w-4 h-4 bg-secondary rounded-full border-4 border-white shadow md:even:hidden" />

      {/* Content Card */}
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Month */}
        <div className="text-info text-lg font-bold mb-2">{item.month}</div>

        {/* Category Badge */}
        <span
          className={`inline-block text-white text-sm px-3 py-1 rounded-full mb-3 ${
            categoryStyles[item.category]
          }`}
        >
          {categoryLabels[item.category]}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}


