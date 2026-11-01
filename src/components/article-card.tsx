import Link from "next/link";
import type { PostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { getCategory } from "@/lib/categories";
import { Thumb } from "./thumb";
import { Calendar, Clock, Bookmark } from "./icons";

/** Horizontal list row that matches the blog listing in the design. */
export function ArticleRow({ post }: { post: PostMeta }) {
  const cat = getCategory(post.category);
  return (
    <article className="reveal group relative flex gap-4 rounded-2xl border border-line bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-card)] sm:gap-5 sm:p-4">
      <Link
        href={`/blog/${post.slug}`}
        className="shrink-0"
        aria-label={post.title}
      >
        <Thumb post={post} className="h-24 w-28 sm:h-28 sm:w-36" />
      </Link>
      <div className="min-w-0 flex-1">
        <span
          className={`text-[0.7rem] font-semibold uppercase tracking-wider ${cat?.accent ?? "text-brand"}`}
        >
          {cat?.name}
        </span>
        <h3 className="mt-1 text-[1.05rem] font-bold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted">
          {post.description}
        </p>
        <div className="mt-2.5 flex items-center gap-4 text-xs text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
          </span>
        </div>
      </div>
      <button
        aria-label="Bookmark"
        className="absolute right-3 top-3 hidden text-faint transition-colors hover:text-brand sm:block"
      >
        <Bookmark className="h-4 w-4" />
      </button>
    </article>
  );
}

/** Vertical card, used in grids. */
export function ArticleCard({ post }: { post: PostMeta }) {
  const cat = getCategory(post.category);
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      <Link href={`/blog/${post.slug}`} aria-label={post.title}>
        <Thumb post={post} rounded="rounded-none" className="aspect-[16/9] w-full" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <span
          className={`text-[0.7rem] font-semibold uppercase tracking-wider ${cat?.accent ?? "text-brand"}`}
        >
          {cat?.name}
        </span>
        <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">
          {post.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
          </span>
        </div>
      </div>
    </article>
  );
}
