import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { countByCategory } from "@/lib/blog";
import { CategoryIcon, ArrowRight } from "@/components/icons";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Explore all topics and find content that matches your interests: web development, backend, DevOps, tools, career, and AI.",
  alternates: { canonical: "/categories" },
};

export default function CategoriesPage() {
  return (
    <div className="container-page py-14">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Categories
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted">
          Explore all topics and find content that matches your interests.
        </p>
      </header>

      <div data-stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = countByCategory(c.key);
          return (
            <Link
              key={c.key}
              href={`/categories/${c.key}`}
              className="reveal group flex flex-col rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-xl ${c.tint} ${c.accent} transition-transform group-hover:scale-110`}
                >
                  <CategoryIcon name={c.icon} className="h-6 w-6" />
                </span>
                <span className="rounded-full bg-bg-subtle px-3 py-1 text-xs font-semibold text-muted">
                  {count} {count === 1 ? "Article" : "Articles"}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-bold text-ink">{c.name}</h2>
              <p className="mt-1.5 flex-1 text-sm text-muted">{c.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand group-hover:gap-2.5">
                Browse <ArrowRight className="h-4 w-4 transition-all" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
