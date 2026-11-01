import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CategoryKey } from "./categories";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  category: CategoryKey;
  date: string; // ISO yyyy-mm-dd
  image?: string;
  featured?: boolean;
  keywords?: string[];
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  readingTime: number; // minutes
  published: boolean; // date has arrived (public) vs. scheduled (upcoming)
}

/** Serializable post metadata (no MDX body), safe to pass to client components. */
export type PostMeta = Omit<Post, "content">;

export function toMeta(p: Post): PostMeta {
  const { content: _content, ...meta } = p;
  void _content;
  return meta;
}

// Set NEXT_PUBLIC_PREVIEW_ALL=1 to reveal scheduled posts (useful while writing).
const PREVIEW_ALL = process.env.NEXT_PUBLIC_PREVIEW_ALL === "1";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function readingTimeOf(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

let _cache: Post[] | null = null;

/** Every article on disk, scheduled or live, newest date first. */
function readAll(): Post[] {
  if (_cache) return _cache;
  if (!fs.existsSync(BLOG_DIR)) return [];
  const today = todayISO();

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    return {
      ...fm,
      slug,
      content,
      readingTime: readingTimeOf(content),
      published: PREVIEW_ALL || fm.date <= today,
    } satisfies Post;
  });

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  _cache = posts;
  return posts;
}

/** Public-facing posts: live today (or all when previewing). */
export function getAllPosts(): Post[] {
  return readAll().filter((p) => p.published);
}

/** The full editorial calendar including future/scheduled posts, oldest first. */
export function getSchedule(): Post[] {
  return [...readAll()].sort((a, b) => (a.date > b.date ? 1 : -1));
}

export function getScheduledPosts(): Post[] {
  return getSchedule().filter((p) => !p.published);
}

export function getPost(slug: string): Post | undefined {
  // Scheduled posts are readable by direct URL but noindex'd (see page).
  return readAll().find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategoryKey): Post[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function getFeaturedPost(): Post | undefined {
  const live = getAllPosts();
  return live.find((p) => p.featured) ?? live[0] ?? getSchedule()[0];
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const pool = getAllPosts();
  const sameCat = pool.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const rest = pool.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  return [...sameCat, ...rest].slice(0, limit);
}

export function countByCategory(category: CategoryKey): number {
  return getPostsByCategory(category).length;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = content.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (line.trim().startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/[#*`]/g, "").trim();
      items.push({ id: slugify(text), text, level });
    }
  }
  return items;
}

export { formatDate } from "./format";
