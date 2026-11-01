import type { Metadata } from "next";
import { BlogExplorer } from "@/components/blog-explorer";
import { ContentCalendar } from "@/components/content-calendar";
import { getAllPosts, getScheduledPosts, toMeta } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "In-depth tutorials, guides and insights to help you become a better developer.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts().map(toMeta);
  const scheduled = getScheduledPosts().map(toMeta);

  return (
    <div className="pb-10">
      <header className="container-page pt-14">
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Blog
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted">
          In-depth tutorials, guides and insights to help you become a better
          developer.
        </p>
      </header>

      <div className="container-page py-10">
        <BlogExplorer posts={posts} />
      </div>

      <ContentCalendar scheduled={scheduled} />
    </div>
  );
}
