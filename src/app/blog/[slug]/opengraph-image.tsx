import { ogImageResponse, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { getPost, getAllPosts } from "@/lib/blog";
import { getCategory } from "@/lib/categories";
import { site } from "@/lib/site";

export const alt = `${site.name} article`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? site.name;
  const kicker = post ? getCategory(post.category)?.name ?? site.name : site.name;
  return ogImageResponse({ title, kicker });
}
