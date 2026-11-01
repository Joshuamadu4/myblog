/**
 * Central affiliate-link registry.
 *
 * ▶ To change where a link points, edit the `url` here, and every post that
 *   references the same id updates automatically. No need to touch the articles.
 *
 * Each entry is keyed by a short id you use in MDX:
 *   <Aff id="cursor">Cursor</Aff>          → inline text link
 *   <AffButton id="cursor">Try Cursor</AffButton>  → call-to-action button
 *   <AffBox id="cursor" />                  → recommendation card
 *
 * The URLs below are EXAMPLES (product homepages). Replace each with your real
 * affiliate link (usually the product URL plus your ref/affiliate query, e.g.
 * "?ref=you"). Hardware links are typically your Amazon Associates URL.
 */

export interface Affiliate {
  /** Display name, shown in <AffBox> and used as default link text. */
  name: string;
  /** The affiliate URL. This is the one thing you'll change over time. */
  url: string;
  /** One-line pitch, shown in <AffBox>. Optional. */
  blurb?: string;
  /** Button label for <AffBox> / default <AffButton> text. Optional. */
  cta?: string;
}

export const affiliates: Record<string, Affiliate> = {
  // ── AI coding tools ──────────────────────────────────────────────
  cursor: {
    name: "Cursor",
    url: "https://cursor.com",
    blurb: "AI-first code editor with fast inline edits and an agent mode.",
    cta: "Try Cursor",
  },
  "github-copilot": {
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    blurb: "AI pair programmer with deep GitHub and VS Code integration.",
    cta: "Get Copilot",
  },
  "claude-code": {
    name: "Claude Code",
    url: "https://www.anthropic.com/claude-code",
    blurb: "Agentic CLI that reads your whole repo, plans, and edits across files.",
    cta: "Try Claude Code",
  },

  // ── Hosting, cloud & VPS ─────────────────────────────────────────
  hetzner: {
    name: "Hetzner Cloud",
    url: "https://www.hetzner.com/cloud",
    blurb: "Unbeatable price-to-performance VPS hosting for Node.js apps.",
    cta: "View plans",
  },
  digitalocean: {
    name: "DigitalOcean",
    url: "https://www.digitalocean.com",
    blurb: "Developer-friendly cloud with the best docs and a clean dashboard.",
    cta: "Start free",
  },
  vercel: {
    name: "Vercel",
    url: "https://vercel.com",
    blurb: "Zero-config deploys for Next.js with global edge and preview URLs.",
    cta: "Start free",
  },
  cloudflare: {
    name: "Cloudflare",
    url: "https://www.cloudflare.com",
    blurb: "Global edge network and a generous free tier for edge-first apps.",
    cta: "Start free",
  },
  railway: {
    name: "Railway",
    url: "https://railway.app",
    blurb: "Push-to-deploy simplicity with a database attached in minutes.",
    cta: "Try Railway",
  },
  render: {
    name: "Render",
    url: "https://render.com",
    blurb: "Managed web services with health checks and zero-downtime deploys.",
    cta: "Try Render",
  },

  // ── Databases ────────────────────────────────────────────────────
  neon: {
    name: "Neon",
    url: "https://neon.tech",
    blurb: "Serverless Postgres with branching and a generous free tier.",
    cta: "Start free",
  },
  supabase: {
    name: "Supabase",
    url: "https://supabase.com",
    blurb: "Postgres plus auth, storage, and realtime in one service.",
    cta: "Start free",
  },

  // ── API clients & dev tools ──────────────────────────────────────
  postman: {
    name: "Postman",
    url: "https://www.postman.com",
    blurb: "The full-featured API standard: collections, environments, mock servers.",
    cta: "Get Postman",
  },
  insomnia: {
    name: "Insomnia",
    url: "https://insomnia.rest",
    blurb: "A cleaner, faster open-core API client for day-to-day requests.",
    cta: "Get Insomnia",
  },
  bruno: {
    name: "Bruno",
    url: "https://www.usebruno.com",
    blurb: "Git-friendly, offline-first API client that stores requests in your repo.",
    cta: "Get Bruno",
  },
  bun: {
    name: "Bun",
    url: "https://bun.sh",
    blurb: "All-in-one runtime, bundler, and package manager that's remarkably fast.",
    cta: "Get Bun",
  },
  vite: {
    name: "Vite",
    url: "https://vitejs.dev",
    blurb: "The dev server and bundler standard, with instant HMR and a huge plugin ecosystem.",
    cta: "Get Vite",
  },
  gitlens: {
    name: "GitLens",
    url: "https://www.gitkraken.com/gitlens",
    blurb: "Supercharges Git in VS Code: inline blame, history, and diffs.",
    cta: "Get GitLens",
  },
  "error-lens": {
    name: "Error Lens",
    url: "https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens",
    blurb: "Surfaces errors and warnings right on the line as you type.",
    cta: "Get Error Lens",
  },
  gitkraken: {
    name: "GitKraken",
    url: "https://www.gitkraken.com",
    blurb: "Beautiful cross-platform Git GUI with an intuitive commit graph.",
    cta: "Try GitKraken",
  },
  fork: {
    name: "Fork",
    url: "https://fork.dev",
    blurb: "Fast, native, reasonably priced Git client for macOS and Windows.",
    cta: "Get Fork",
  },

  // ── Email & SMS APIs ─────────────────────────────────────────────
  resend: {
    name: "Resend",
    url: "https://resend.com",
    blurb: "Developer-first email API with a clean SDK and React Email templates.",
    cta: "Start free",
  },
  postmark: {
    name: "Postmark",
    url: "https://postmarkapp.com",
    blurb: "Renowned for fast, reliable transactional email deliverability.",
    cta: "Try Postmark",
  },
  twilio: {
    name: "Twilio",
    url: "https://www.twilio.com",
    blurb: "The industry-standard SMS API: global reach and excellent docs.",
    cta: "Get started",
  },
  vonage: {
    name: "Vonage",
    url: "https://www.vonage.com/communications-apis",
    blurb: "Strong global SMS coverage at competitive pricing.",
    cta: "Get started",
  },

  // ── Payments ─────────────────────────────────────────────────────
  paystack: {
    name: "Paystack",
    url: "https://paystack.com",
    blurb: "Clean API and reliable local payments, the Nigerian developer favourite.",
    cta: "Open an account",
  },
  flutterwave: {
    name: "Flutterwave",
    url: "https://flutterwave.com",
    blurb: "Broad pan-African coverage with many payment methods.",
    cta: "Get started",
  },

  // ── Laptops / hardware (use your Amazon Associates links) ────────
  "macbook-pro-14": {
    name: "MacBook Pro 14 (M4 Pro)",
    url: "https://www.apple.com/macbook-pro",
    blurb: "Silent, long battery life, and superb for JS, mobile, and backend work.",
    cta: "Check price",
  },
  "macbook-air-15": {
    name: "MacBook Air 15 (M4)",
    url: "https://www.apple.com/macbook-air",
    blurb: "Fanless and light, with plenty of power for web dev without heavy local VMs.",
    cta: "Check price",
  },
  "macbook-air-m2": {
    name: "MacBook Air (M2)",
    url: "https://www.apple.com/macbook-air",
    blurb: "Often under $1,000 on sale, with unbeatable battery and build for the money.",
    cta: "Check price",
  },
  "lenovo-ideapad-slim-5": {
    name: "Lenovo IdeaPad Slim 5",
    url: "https://www.lenovo.com/us/en/c/laptops/ideapad/ideapad-slim-series",
    blurb: "16GB RAM and solid Ryzen performance, frequently around $700.",
    cta: "Check price",
  },

  // ── Courses ──────────────────────────────────────────────────────
  "adrian-cantrill-aws": {
    name: "Adrian Cantrill's AWS Courses",
    url: "https://learn.cantrill.io",
    blurb: "Deep, project-heavy AWS courses praised for genuine understanding.",
    cta: "View courses",
  },
  "aws-skill-builder": {
    name: "AWS Skill Builder",
    url: "https://skillbuilder.aws",
    blurb: "Free first-party AWS learning paths straight from the source.",
    cta: "Start learning",
  },
  "odin-project": {
    name: "The Odin Project",
    url: "https://www.theodinproject.com",
    blurb: "Free, project-based, genuinely comprehensive full-stack curriculum.",
    cta: "Start learning",
  },
  "andrew-mead-node": {
    name: "Node.js by Andrew Mead",
    url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2",
    blurb: "A popular, hands-on path through Node, Express, and MongoDB.",
    cta: "View course",
  },
  "full-stack-open": {
    name: "Full Stack Open",
    url: "https://fullstackopen.com",
    blurb: "Free, university-grade React/Node curriculum from the University of Helsinki.",
    cta: "Start learning",
  },

  // Add more entries here any time. Just give each a short id and a url.
};

/** Look up an affiliate by id. Returns undefined for unknown ids. */
export function getAffiliate(id: string): Affiliate | undefined {
  return affiliates[id];
}
