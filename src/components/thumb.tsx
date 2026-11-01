import type { PostMeta } from "@/lib/blog";

/**
 * Branded, imageless thumbnail: a dark tile with a subtle grid and a big
 * monospace label pulled from the article's topic. Renders crisp at any size,
 * ships zero image bytes, and echoes the dark thumbnails in the design.
 */

const TOPICS: { match: RegExp; label: string; glow: string }[] = [
  { match: /next\.?js/i, label: "NEXT.js", glow: "#38bdf8" },
  { match: /nest\.?js/i, label: "NestJS", glow: "#f43f5e" },
  { match: /docker/i, label: "docker", glow: "#38bdf8" },
  { match: /vs ?code|extensions/i, label: "VS Code", glow: "#38bdf8" },
  { match: /aws|ec2/i, label: "AWS", glow: "#fb923c" },
  { match: /vercel/i, label: "▲ Vercel", glow: "#e2e8f0" },
  { match: /digitalocean/i, label: "DO", glow: "#38bdf8" },
  { match: /mongo/i, label: "MongoDB", glow: "#4ade80" },
  { match: /postgres/i, label: "Postgres", glow: "#38bdf8" },
  { match: /prisma/i, label: "Prisma", glow: "#818cf8" },
  { match: /typeorm/i, label: "TypeORM", glow: "#fb923c" },
  { match: /express/i, label: "Express", glow: "#94a3b8" },
  { match: /git\b|github/i, label: "git", glow: "#fb923c" },
  { match: /postman|api testing|api\b/i, label: "{ API }", glow: "#4ade80" },
  { match: /cursor|copilot|claude|ai\b/i, label: "AI", glow: "#a78bfa" },
  { match: /laptop|hardware/i, label: "</>", glow: "#38bdf8" },
  { match: /payment|stripe/i, label: "$ pay", glow: "#4ade80" },
  { match: /email/i, label: "@ mail", glow: "#38bdf8" },
  { match: /sms/i, label: "SMS", glow: "#4ade80" },
  { match: /course/i, label: "learn", glow: "#fbbf24" },
  { match: /cloud|hosting|vps|startup/i, label: "cloud", glow: "#38bdf8" },
  { match: /javascript|js\b/i, label: "JS", glow: "#fbbf24" },
];

function topicOf(post: PostMeta) {
  const hay = `${post.title} ${post.slug}`;
  return (
    TOPICS.find((t) => t.match.test(hay)) ?? {
      label: "</>",
      glow: "#38bdf8",
    }
  );
}

export function Thumb({
  post,
  className = "",
  rounded = "rounded-xl",
}: {
  post: PostMeta;
  className?: string;
  rounded?: string;
}) {
  const { label, glow } = topicOf(post);
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        background:
          "radial-gradient(120% 120% at 15% 0%, #16213e 0%, #0b1220 55%, #060912 100%)",
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(120% 90% at 30% 20%, #000 20%, transparent 75%)",
        }}
      />
      <div
        className="absolute -right-8 -top-10 h-40 w-40 rounded-full blur-3xl"
        style={{ background: glow, opacity: 0.25 }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className="font-mono text-2xl font-bold tracking-tight text-white sm:text-3xl"
          style={{ textShadow: `0 0 30px ${glow}66` }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
