import { Metadata } from 'next';
import { getNewsData } from '@/lib/data-loader';
import Timeline from '@/components/news/timeline';

export const metadata: Metadata = {
  title: '新闻动态',
  description: '西浦微系统课题组最新动态、研究成果和活动新闻',
};

export default async function NewsPage() {
  const newsData = await getNewsData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-primary">
          新闻动态
        </h1>
        <Timeline newsData={newsData} />
      </div>
    </div>
  );
}


