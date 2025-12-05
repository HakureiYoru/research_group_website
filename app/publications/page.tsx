import { Metadata } from "next";
import PublicationList from "@/components/publications/publication-list";
import { getPublicationsData, groupPublicationsByYear } from "@/lib/data-loader";

export const metadata: Metadata = {
  title: "学术成果 / Publications",
  description: "课题组通过 OpenAlex 与 Semantic Scholar 聚合的开放出版物列表。",
};

export const dynamic = "force-static";

export default async function PublicationsPage() {
  const publications = await getPublicationsData();
  const groups = groupPublicationsByYear(publications);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white py-12">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-10 text-center space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-dark">
            Data-driven · Static · Edge-first
          </p>
          <h1 className="text-4xl font-bold text-primary">学术成果</h1>
          <p className="text-gray-600">
            数据由构建期脚本对 OpenAlex（主）与 Semantic Scholar（辅）聚合而成，去谷歌化本地化呈现。
          </p>
        </header>
        <PublicationList groups={groups} />
      </div>
    </div>
  );
}
