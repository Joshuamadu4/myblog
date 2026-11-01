"use client";

import { useMemo, useState } from "react";
import type { PostMeta } from "@/lib/blog";
import { categories } from "@/lib/categories";
import { ArticleRow } from "./article-card";
import { Search } from "./icons";

const FILTERS = [
  { key: "all", name: "All" },
  ...categories.map((c) => ({ key: c.key, name: c.name })),
];

export function BlogExplorer({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"latest" | "oldest">("latest");

  const results = useMemo(() => {
    let list = posts;
    if (active !== "all") list = list.filter((p) => p.category === active);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    list = [...list].sort((a, b) =>
      sort === "latest"
        ? a.date < b.date
          ? 1
          : -1
        : a.date > b.date
          ? 1
          : -1
    );
    return list;
  }, [posts, active, query, sort]);

  return (
    <div>
      <div className="relative mb-5">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-faint" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles…"
          className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-body outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="hide-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                active === f.key
                  ? "bg-brand text-white"
                  : "border border-line bg-white text-body hover:border-line-strong"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as "latest" | "oldest")}
          className="shrink-0 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-body outline-none focus:border-brand"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-3">
          {results.map((p) => (
            <ArticleRow key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-line-strong bg-bg-subtle p-10 text-center text-muted">
          No articles match your search yet.
        </p>
      )}
    </div>
  );
}
