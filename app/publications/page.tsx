import { Metadata } from 'next';
import PublicationsClient from '@/components/publications/publications-client';
import { extractPublicationFacets, getPublicationsData } from '@/lib/data-loader';

export const metadata: Metadata = {
  title: '学术发表',
  description: '西浦微系统课题组学术发表列表与筛选',
};

export default async function PublicationsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const publications = await getPublicationsData();
  const { years, authors } = extractPublicationFacets(publications);
  const resolvedSearchParams = (await searchParams) ?? {};
  const initialAuthor = Array.isArray(resolvedSearchParams.author)
    ? resolvedSearchParams.author[0]
    : resolvedSearchParams.author;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          学术发表
        </h1>

        <PublicationsClient
          publications={publications}
          years={years}
          authors={authors}
          initialAuthor={initialAuthor}
        />
      </div>
    </div>
  );
}


