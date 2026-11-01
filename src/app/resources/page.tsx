import type { Metadata } from "next";
import { ArrowUpRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "A hand-picked list of developer tools, platforms, and learning resources I actually use and recommend.",
  alternates: { canonical: "/resources" },
};

const groups: { title: string; items: { name: string; note: string; href: string }[] }[] = [
  {
    title: "Deploy & Host",
    items: [
      { name: "Vercel", note: "Zero-config hosting for Next.js & full-stack apps", href: "https://vercel.com" },
      { name: "Railway", note: "Push-to-deploy backends and databases", href: "https://railway.app" },
      { name: "Hetzner", note: "Best-value VPS for self-hosting", href: "https://hetzner.com" },
      { name: "Fly.io", note: "Run containers close to your users", href: "https://fly.io" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "Neon", note: "Serverless Postgres with branching", href: "https://neon.tech" },
      { name: "Supabase", note: "Postgres + auth + storage + realtime", href: "https://supabase.com" },
      { name: "MongoDB Atlas", note: "Managed MongoDB in the cloud", href: "https://mongodb.com/atlas" },
      { name: "Prisma", note: "Type-safe ORM for TypeScript", href: "https://prisma.io" },
    ],
  },
  {
    title: "Dev Tools",
    items: [
      { name: "Cursor", note: "AI-first code editor", href: "https://cursor.com" },
      { name: "Bruno", note: "Git-friendly API client", href: "https://usebruno.com" },
      { name: "Warp", note: "Modern terminal with AI", href: "https://warp.dev" },
      { name: "Biome", note: "Fast lint + format in one tool", href: "https://biomejs.dev" },
    ],
  },
  {
    title: "Learn",
    items: [
      { name: "The Odin Project", note: "Free full-stack curriculum", href: "https://theodinproject.com" },
      { name: "Full Stack Open", note: "University-grade React/Node course", href: "https://fullstackopen.com" },
      { name: "roadmap.sh", note: "Developer learning roadmaps", href: "https://roadmap.sh" },
      { name: "NestJS Docs", note: "Learn structured Node backends", href: "https://docs.nestjs.com" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="container-page py-14">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          Resources
        </h1>
        <p className="mt-3 max-w-xl text-lg text-muted">
          A hand-picked list of tools, platforms, and learning resources I
          actually use and recommend.
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {groups.map((g) => (
          <section key={g.title}>
            <h2 className="text-xl font-bold text-ink">{g.title}</h2>
            <div
              data-stagger
              className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            >
              {g.items.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reveal group flex flex-col rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-card)]"
                >
                  <span className="flex items-center justify-between">
                    <span className="font-semibold text-ink group-hover:text-brand">
                      {item.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-faint group-hover:text-brand" />
                  </span>
                  <span className="mt-1.5 text-sm text-muted">{item.note}</span>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
