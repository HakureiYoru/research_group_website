import { Publication } from "@/types";

interface PublicationCardProps {
  publication: Publication;
}

const badgeBase =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide";

export default function PublicationCard({ publication }: PublicationCardProps) {
  const {
    title,
    venue,
    year,
    tldr,
    citationCount,
    authors,
    links,
    openAccess,
    manualNote,
  } = publication;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-dark">
            {year} · {venue || "未标注期刊/会议"}
          </p>
          <h3 className="text-xl font-semibold leading-snug text-slate-900">
            {links.landingUrl ? (
              <a
                href={links.landingUrl}
                className="text-primary hover:text-primary-dark"
                target="_blank"
                rel="noreferrer"
              >
                {title}
              </a>
            ) : (
              title
            )}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {links.pdfUrl && (
            <a
              href={links.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-primary bg-primary px-3 py-1 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              PDF 下载
            </a>
          )}
          {links.codeUrl && (
            <a
              href={links.codeUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
            >
              代码链接
            </a>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {authors.map((author) => {
          const highlight = author.isGroupMember;
          return (
            <span
              key={author.name}
              className={`${badgeBase} ${
                highlight
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-200 bg-slate-50 text-slate-700"
              }`}
              title={highlight ? "课题组成员" : undefined}
            >
              {author.name}
            </span>
          );
        })}
      </div>

      {tldr && (
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          {tldr}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600">
        {openAccess && (
          <span
            className={`${badgeBase} border-green-200 bg-green-50 text-green-700`}
          >
            OA PDF 可用
          </span>
        )}
        {links.doi && (
          <span className="rounded-full bg-slate-100 px-3 py-1">
            DOI: {links.doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")}
          </span>
        )}
        {citationCount !== undefined && citationCount > 0 && (
          <span className="rounded-full bg-slate-100 px-3 py-1">
            引用数：{citationCount}
          </span>
        )}
        {manualNote && (
          <span
            className="rounded-full bg-amber-50 px-3 py-1 text-amber-700"
            title={manualNote}
          >
            手动补充
          </span>
        )}
      </div>
    </article>
  );
}
