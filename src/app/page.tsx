import Link from "next/link";
import { Hero } from "@/components/hero";
import { TopicsGrid } from "@/components/topics-grid";
import { Newsletter } from "@/components/newsletter";
import { ArticleRow } from "@/components/article-card";
import { Thumb } from "@/components/thumb";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { getAllPosts, getFeaturedPost, formatDate } from "@/lib/blog";
import { getCategory } from "@/lib/categories";

export const revalidate = 3600; // re-check the publish schedule hourly

export default function HomePage() {
  const featured = getFeaturedPost();
  const posts = getAllPosts();
  const latest = posts.filter((p) => p.slug !== featured?.slug).slice(0, 5);
  const spotlight = posts.find(
    (p) => p.category === "tools" && p.slug !== featured?.slug
  );

  return (
    <>
      <Hero />

      {/* Featured band */}
      {featured && (
        <section className="container-page py-8">
          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
            <article className="reveal group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-white p-7 transition-shadow hover:shadow-[var(--shadow-lift)]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                  Featured article
                </span>
                <h2 className="mt-3 max-w-lg text-2xl font-bold leading-snug text-ink sm:text-3xl">
                  <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="mt-3 max-w-lg text-body">{featured.description}</p>
              </div>
              <Link
                href={`/blog/${featured.slug}`}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-700"
              >
                Read article <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-50 blur-2xl" />
            </article>

            {spotlight && (
              <Link
                href={`/blog/${spotlight.slug}`}
                className="reveal group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-bg-dark p-7 text-white transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                    backgroundSize: "28px 28px",
                    maskImage:
                      "radial-gradient(90% 90% at 80% 10%, #000 20%, transparent 75%)",
                  }}
                />
                <div className="relative">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Editor&apos;s pick
                  </span>
                  <h3 className="mt-3 max-w-xs text-2xl font-bold leading-snug">
                    {spotlight.title}
                  </h3>
                </div>
                <span className="relative mt-6 inline-flex items-center gap-2 font-semibold text-white/90">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            )}
          </div>
        </section>
      )}

      <TopicsGrid />

      {/* Latest */}
      <section className="container-page py-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand">
              Fresh off the press
            </span>
            <h2 className="mt-2 text-2xl font-bold text-ink sm:text-3xl">
              Latest articles
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-700"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {latest.length > 0 ? (
          <div data-stagger className="grid gap-3">
            {latest.map((p) => (
              <ArticleRow key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </section>

      <div className="py-8">
        <Newsletter />
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-bg-subtle p-10 text-center">
      <p className="font-semibold text-ink">The first article drops today.</p>
      <p className="mt-1 text-sm text-muted">
        New guides publish daily for the next 30 days.{" "}
        <Link href="/blog" className="text-brand hover:underline">
          See the content calendar →
        </Link>
      </p>
    </div>
  );
}
