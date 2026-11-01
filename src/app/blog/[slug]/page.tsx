import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/mdx";
import { Comments } from "@/components/comments";
import { Thumb } from "@/components/thumb";
import { TableOfContents } from "@/components/table-of-contents";
import { ShareLinks } from "@/components/share-links";
import {
  getAllPosts,
  getPost,
  getRelatedPosts,
  extractToc,
  toMeta,
} from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { getCategory } from "@/lib/categories";
import { site } from "@/lib/site";
import { Calendar, Clock, ArrowRight, ArrowUpRight } from "@/components/icons";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const url = `${site.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: post.published ? undefined : { index: false, follow: false },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      authors: [site.author.name],
      section: getCategory(post.category)?.name,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post || !post.published) notFound();

  const cat = getCategory(post.category);
  const toc = extractToc(post.content);
  const related = getRelatedPosts(post).map(toMeta);
  const url = `${site.url}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: [`${site.url}/blog/${post.slug}/opengraph-image`],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: site.author.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    mainEntityOfPage: url,
    articleSection: cat?.name,
    keywords: post.keywords?.join(", "),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: url,
      },
    ],
  };

  return (
    <article className="container-page py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted">
        <Link href="/" className="hover:text-brand">
          Home
        </Link>
        <span className="text-faint">/</span>
        <Link href="/blog" className="hover:text-brand">
          Blog
        </Link>
        <span className="text-faint">/</span>
        <Link
          href={`/categories/${post.category}`}
          className={`${cat?.accent} font-medium`}
        >
          {cat?.name}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        {/* main column */}
        <div className="min-w-0">
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${cat?.accent}`}
          >
            {cat?.name}
          </span>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-body">{post.description}</p>

          {/* author row */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand/10 font-bold text-brand">
                {site.author.name.charAt(0)}
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  {site.author.name}
                </p>
                <p className="flex items-center gap-3 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {post.readingTime} min read
                  </span>
                </p>
              </div>
            </div>
            <ShareLinks title={post.title} url={url} />
          </div>

          {/* hero image */}
          <Thumb
            post={toMeta(post)}
            rounded="rounded-2xl"
            className="mt-8 aspect-[16/8] w-full"
          />

          {/* body */}
          <div className="mt-10">
            <Mdx source={post.content} />
          </div>

          {/* footer cta */}
          <div className="mt-12 rounded-2xl border border-line bg-bg-subtle p-6">
            <p className="text-sm font-semibold text-ink">
              Enjoyed this? Get the next one in your inbox.
            </p>
            <p className="mt-1 text-sm text-muted">
              A new developer guide every day for 30 days.
            </p>
            <Link
              href="/#subscribe"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* comments & questions */}
          <Comments />
        </div>

        {/* sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-8">
            <TableOfContents items={toc} />

            {related.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                  Related articles
                </p>
                <ul className="mt-4 space-y-4">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/blog/${r.slug}`}
                        className="group flex items-start gap-2 text-sm font-medium text-body hover:text-brand"
                      >
                        <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-faint group-hover:text-brand" />
                        <span className="leading-snug">{r.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>
    </article>
  );
}
