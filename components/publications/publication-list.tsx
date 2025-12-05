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
  if (!groups.length) {
    return (
      <EmptyState message="暂无可展示的出版物，请先运行 fetcher.py 生成数据。" />
    );
  }

  return (
    <div className="space-y-10">
      {groups.map((group) => (
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
  );
}
