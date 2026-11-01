import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/lib/categories";
import { getPostsByCategory, toMeta } from "@/lib/blog";
import { ArticleCard } from "@/components/article-card";
import { CategoryIcon } from "@/components/icons";

export const revalidate = 3600;

export function generateStaticParams() {
  return categories.map((c) => ({ key: c.key }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[key]">): Promise<Metadata> {
  const { key } = await params;
  const cat = getCategory(key);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/categories/${cat.key}` },
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[key]">) {
  const { key } = await params;
  const cat = getCategory(key);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.key).map(toMeta);

  return (
    <div className="container-page py-12">
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/categories" className="hover:text-brand">
          Categories
        </Link>
        <span className="text-faint">/</span>
        <span className="text-ink">{cat.name}</span>
      </nav>

      <header className="mt-6 flex items-center gap-4">
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl ${cat.tint} ${cat.accent}`}
        >
          <CategoryIcon name={cat.icon} className="h-7 w-7" />
        </span>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-1 text-muted">{cat.description}</p>
        </div>
      </header>

      {posts.length > 0 ? (
        <div
          data-stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {posts.map((p) => (
            <ArticleCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-2xl border border-dashed border-line-strong bg-bg-subtle p-10 text-center text-muted">
          Articles in this category are on the way. Check back soon.
        </p>
      )}
    </div>
  );
}
