import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { getCategory } from "@/lib/categories";
import { Calendar } from "./icons";

/** The 30-day drip schedule of upcoming articles with their publish dates. */
export function ContentCalendar({ scheduled }: { scheduled: PostMeta[] }) {
  if (scheduled.length === 0) return null;
  return (
    <section className="container-page py-4">
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand">
          <Calendar className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-ink">Content calendar</h2>
          <p className="text-sm text-muted">
            One new article publishes every day. Here&apos;s what&apos;s coming.
          </p>
        </div>
      </div>

      <ol data-stagger className="grid gap-2 sm:grid-cols-2">
        {scheduled.map((p, i) => {
          const cat = getCategory(p.category);
          return (
            <li
              key={p.slug}
              className="reveal flex items-center gap-4 rounded-xl border border-dashed border-line-strong bg-bg-subtle px-4 py-3"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-xs font-bold text-faint">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink">
                  {p.title}
                </p>
                <p className="text-xs text-faint">
                  {cat?.name} · {formatDate(p.date)}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-medium text-muted">
                Scheduled
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
