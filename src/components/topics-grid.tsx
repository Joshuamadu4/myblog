import Link from "next/link";
import { categories } from "@/lib/categories";
import { countByCategory } from "@/lib/blog";
import { CategoryIcon, ArrowRight } from "./icons";

export function TopicsGrid() {
  return (
    <section className="container-page py-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">
            Browse by topics
          </span>
          <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
            Find your next read
          </h2>
        </div>
        <Link
          href="/categories"
          className="hidden items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-700 sm:inline-flex"
        >
          View all categories <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div
        data-stagger
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6"
      >
        {categories.map((c) => {
          const count = countByCategory(c.key);
          return (
            <Link
              key={c.key}
              href={`/categories/${c.key}`}
              className="reveal group flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-card)]"
            >
              <span
                className={`grid h-12 w-12 place-items-center rounded-xl ${c.tint} ${c.accent} transition-transform group-hover:scale-110`}
              >
                <CategoryIcon name={c.icon} className="h-6 w-6" />
              </span>
              <span className="text-sm font-semibold leading-tight text-ink">
                {c.name}
              </span>
              <span className="text-xs text-faint">
                {count} {count === 1 ? "Article" : "Articles"}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
