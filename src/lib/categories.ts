export type CategoryKey =
  | "web-development"
  | "backend"
  | "devops"
  | "tools"
  | "career"
  | "ai";

export interface Category {
  key: CategoryKey;
  name: string;
  description: string;
  icon: string; // lucide-style key rendered by <CategoryIcon />
  accent: string; // tailwind text color class
  tint: string; // tailwind bg tint class
}

export const categories: Category[] = [
  {
    key: "web-development",
    name: "Web Development",
    description: "Frontend, Next.js, React, TypeScript and more.",
    icon: "layout",
    accent: "text-sky-600",
    tint: "bg-sky-50",
  },
  {
    key: "backend",
    name: "Backend",
    description: "Node.js, NestJS, APIs, databases and more.",
    icon: "server",
    accent: "text-emerald-600",
    tint: "bg-emerald-50",
  },
  {
    key: "devops",
    name: "DevOps",
    description: "Docker, CI/CD, AWS, monitoring and more.",
    icon: "infinity",
    accent: "text-violet-600",
    tint: "bg-violet-50",
  },
  {
    key: "tools",
    name: "Tools & Reviews",
    description: "Developer tools, software reviews and comparisons.",
    icon: "wrench",
    accent: "text-orange-600",
    tint: "bg-orange-50",
  },
  {
    key: "career",
    name: "Career",
    description: "Career tips, resumes, interviews and more.",
    icon: "user",
    accent: "text-rose-600",
    tint: "bg-rose-50",
  },
  {
    key: "ai",
    name: "AI for Developers",
    description: "AI tools, prompts and productivity guides.",
    icon: "sparkles",
    accent: "text-indigo-600",
    tint: "bg-indigo-50",
  },
];

export const categoryMap: Record<CategoryKey, Category> = Object.fromEntries(
  categories.map((c) => [c.key, c])
) as Record<CategoryKey, Category>;

export function getCategory(key: string): Category | undefined {
  return categoryMap[key as CategoryKey];
}
