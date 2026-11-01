/**
 * Generates the 30 launch articles as MDX files with frontmatter + real,
 * SEO-structured starter bodies. Re-runnable: it will not overwrite a file
 * that has been hand-edited beyond the generated marker (safe to expand later).
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "content", "blog");
fs.mkdirSync(OUT, { recursive: true });

const GEN_MARK = "{/* generated:starter */}";

// 30-day drip: one article per day, starting today (2026-08-16) going forward.
// Article i publishes on launch + i days. content/publish-schedule.ts mirrors this.
const startDate = new Date(Date.UTC(2026, 7, 16));
const dateFor = (i) => {
  const d = new Date(startDate);
  d.setUTCDate(d.getUTCDate() + i);
  return d.toISOString().slice(0, 10);
};

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** @type {Array<any>} */
const posts = [
  {
    t: "Best AI Coding Tools for Developers in 2026",
    c: "ai",
    featured: true,
    d: "The AI coding tools worth your time in 2026, from autocomplete to full agentic pair programmers, ranked by real-world developer workflows.",
    intro:
      "AI coding tools went from novelty to daily driver faster than any dev tool in memory. In 2026 the question is no longer *whether* to use one, but *which* fits your stack, budget, and the way you actually ship code.",
    picks: [
      ["Claude Code", "Agentic CLI that reads your whole repo, plans, and edits across files, strongest for large refactors and multi-step tasks."],
      ["Cursor", "AI-first editor (VS Code fork) with fast inline edits, tab completion, and an agent mode. The default for many full-time developers."],
      ["GitHub Copilot", "The incumbent. Deep GitHub/VS Code integration, solid completions, and now a capable chat + agent experience."],
      ["Windsurf", "Codeium's agentic editor with a clean 'flow' UX and generous free tier."],
      ["Zed AI", "Blazing-fast native editor with collaborative AI baked in, great if you care about latency."],
    ],
    verdict:
      "For deep, repo-wide work pick an agentic tool like Claude Code; for everyday editing Cursor or Copilot will feel fastest. Most pros run a combination.",
  },
  {
    t: "Cursor vs GitHub Copilot vs Claude Code",
    c: "ai",
    featured: true,
    d: "A hands-on comparison of Cursor, GitHub Copilot, and Claude Code across pricing, agentic power, editor experience, and the tasks each one wins.",
    type: "versus",
    intro:
      "These three dominate the AI coding conversation in 2026, but they solve subtly different problems. Here's how they compare where it counts.",
    picks: [
      ["Cursor", "An editor. Best-in-class inline edits and tab completion, with an agent for multi-file changes. You live inside it all day."],
      ["GitHub Copilot", "An assistant that lives in your existing editor. Lowest friction if you're already on VS Code + GitHub, cheapest entry price."],
      ["Claude Code", "An agent in your terminal. Reads the whole project, plans, runs commands, and edits across files, strongest for big, ambiguous tasks."],
    ],
    verdict:
      "Choose Copilot for low-friction completions, Cursor for an AI-native editor, and Claude Code when you want an agent to own an entire task end-to-end.",
  },
  {
    t: "Best Laptop for Software Developers in 2026",
    c: "tools",
    d: "From the MacBook Pro to Linux ultrabooks, the best developer laptops of 2026 compared on CPU, RAM, battery, and price-to-performance.",
    intro:
      "Your laptop is the one tool you touch every working hour. In 2026 the sweet spot is a quiet, cool machine with enough RAM to run containers and an editor full of AI without breaking a sweat.",
    picks: [
      ["MacBook Pro 14 (M4 Pro)", "The all-round default: superb battery, silent, excellent for JS/mobile/backend. 24GB+ RAM recommended."],
      ["MacBook Air 15 (M4)", "Fanless and light, plenty for web dev if you don't run heavy local VMs."],
      ["Dell XPS 15", "The best Windows option for devs who need CUDA or Windows-only tooling."],
      ["Framework Laptop 13", "Repairable and Linux-friendly, the enthusiast's pick."],
      ["Lenovo ThinkPad X1 Carbon", "Best keyboard in the business and rock-solid Linux support."],
    ],
    verdict:
      "For most developers the MacBook Pro 14 with 24GB RAM is the safest buy; choose a ThinkPad or Framework if you live in Linux.",
  },
  {
    t: "Best Laptop for Programming Under $1,000",
    c: "tools",
    d: "You don't need to spend a fortune to code comfortably. The best budget programming laptops under $1,000 in 2026, tested for real dev work.",
    intro:
      "A great development laptop under $1,000 is absolutely achievable in 2026, as long as you know which specs to prioritise (RAM and SSD) and which to skip.",
    picks: [
      ["MacBook Air M2 (refurb/sale)", "Often dips under $1k on sale, unbeatable battery and build for the money."],
      ["Lenovo IdeaPad Slim 5", "16GB RAM, solid Ryzen performance, frequently ~$700."],
      ["Acer Swift Go 14", "Lightweight OLED option with modern Intel/AMD chips."],
      ["ASUS Vivobook 16", "Big screen and 16GB RAM for comfortable multitasking on a budget."],
      ["Framework Laptop 13 (DIY)", "Build-it-yourself base configs land under $1k and upgrade later."],
    ],
    verdict:
      "Prioritise 16GB RAM and a 512GB SSD over a faster CPU, those two upgrades matter most for day-to-day coding.",
  },
  {
    t: "Vercel vs DigitalOcean",
    c: "devops",
    type: "versus",
    d: "Vercel vs DigitalOcean: managed frontend platform or full control VPS? A practical comparison for deploying modern web apps.",
    intro:
      "Vercel and DigitalOcean sit at opposite ends of the hosting spectrum: one abstracts infrastructure away entirely, the other hands you the whole server. Which you want depends on how much you enjoy ops.",
    picks: [
      ["Vercel", "Zero-config deploys for Next.js and friends, global edge, preview URLs, and Fluid Compute for full Node.js backends. You manage code, not servers."],
      ["DigitalOcean", "Droplets, managed databases, App Platform, and Kubernetes, full control and predictable flat pricing, but you own more of the ops."],
    ],
    verdict:
      "Ship frontend and full-stack apps fastest on Vercel; reach for DigitalOcean when you want a cheap, predictable box you fully control.",
  },
  {
    t: "AWS vs DigitalOcean",
    c: "devops",
    type: "versus",
    d: "AWS vs DigitalOcean compared on pricing, complexity, and scale, which cloud should you actually build on?",
    intro:
      "AWS is the everything store of cloud; DigitalOcean is the developer-friendly corner shop. Both host production apps, the difference is surface area and how much complexity you want to manage.",
    picks: [
      ["AWS", "Hundreds of services, infinite scale, and the deepest ecosystem, at the cost of a steep learning curve and confusing pricing."],
      ["DigitalOcean", "A curated, well-documented subset that covers 90% of needs with transparent flat pricing. Far gentler to learn."],
    ],
    verdict:
      "Start on DigitalOcean for simplicity and predictable cost; move to (or start on) AWS when you need its breadth, compliance, or global scale.",
  },
  {
    t: "Best VPS Hosting for Node.js",
    c: "devops",
    d: "The best VPS providers for hosting Node.js apps in 2026, compared on performance, pricing, and how painless deployment really is.",
    intro:
      "A VPS gives your Node.js app a real server for a few dollars a month, no cold starts, no per-invocation billing, full control. Here are the providers worth running production on.",
    picks: [
      ["Hetzner Cloud", "Absurd price-to-performance in Europe/US. The enthusiast favourite for self-hosted Node."],
      ["DigitalOcean", "Best docs and dashboard, one-click Node droplets, managed databases alongside."],
      ["Linode (Akamai)", "Reliable, developer-friendly, strong global network."],
      ["Vultr", "Widest region coverage and high-frequency compute options."],
      ["AWS Lightsail", "AWS simplicity mode, flat-price VPS with an easy path to the wider AWS ecosystem."],
    ],
    verdict:
      "Hetzner wins on raw value; DigitalOcean wins on developer experience. Either will happily run a production Node.js API.",
  },
  {
    t: "Best Hosting for Next.js",
    c: "devops",
    d: "Where should you deploy Next.js in 2026? Vercel, Netlify, Cloudflare, and self-hosted options compared for App Router apps.",
    intro:
      "Next.js runs almost anywhere, but the platform you pick decides how much of its power (ISR, streaming, image optimisation, middleware) you get for free versus configure by hand.",
    picks: [
      ["Vercel", "Built by the Next.js team, every feature works with zero config, plus preview deploys and edge. The default choice."],
      ["Cloudflare (Workers/Pages)", "Global edge network and generous free tier; great for mostly-static or edge-first apps."],
      ["Netlify", "Solid DX and a mature platform with good Next.js support."],
      ["Self-hosted (Docker/VPS)", "Full control and flat cost, you configure caching, ISR, and images yourself."],
    ],
    verdict:
      "For the smoothest experience deploy Next.js on Vercel; self-host on a VPS when cost predictability or data residency matters more than convenience.",
  },
  {
    t: "Best Hosting for NestJS",
    c: "devops",
    d: "The best places to deploy a NestJS API in 2026, from managed platforms to VPS and containers, compared on cost and effort.",
    intro:
      "NestJS is a long-running Node server, so it's happiest where it can stay warm and connect to a database with low latency. Here's where to put it.",
    picks: [
      ["Railway", "Push-to-deploy simplicity with a database attached in minutes, great DX for NestJS."],
      ["Render", "Managed web services with health checks, autoscaling, and zero-downtime deploys."],
      ["Vercel (Fluid Compute)", "Runs NestJS natively now, good if your frontend already lives there."],
      ["Fly.io", "Run your Nest container close to users globally with persistent volumes."],
      ["VPS (Hetzner/DO) + Docker", "Cheapest at scale and fully in your control."],
    ],
    verdict:
      "Railway or Render get a NestJS API live with the least friction; a Dockerised VPS is the most economical once you're comfortable with ops.",
  },
  {
    t: "MongoDB vs PostgreSQL",
    c: "backend",
    type: "versus",
    featured: true,
    d: "MongoDB vs PostgreSQL: document flexibility or relational rigor? A clear-eyed comparison to help you pick the right database.",
    intro:
      "The document-vs-relational debate is mostly settled by your data, not your preferences. PostgreSQL and MongoDB are both excellent, the trick is matching the model to your access patterns.",
    picks: [
      ["PostgreSQL", "A rock-solid relational database with JSON support, strong consistency, rich querying, and an enormous ecosystem. The safe default."],
      ["MongoDB", "A document database that shines when your data is naturally nested, schemas evolve fast, and you scale horizontally."],
    ],
    verdict:
      "Default to PostgreSQL for most applications; reach for MongoDB when your data is document-shaped and your schema genuinely needs to flex.",
  },
  {
    t: "Prisma vs TypeORM",
    c: "backend",
    type: "versus",
    d: "Prisma vs TypeORM for your TypeScript backend, type safety, migrations, performance, and developer experience compared.",
    intro:
      "Both let you talk to a SQL database from TypeScript, but they take very different philosophies: Prisma is schema-first and generated, TypeORM is decorator-first and class-based.",
    picks: [
      ["Prisma", "A schema file generates a fully typed client. Best-in-class autocomplete, clean migrations, and a great DX. Less flexible for exotic SQL."],
      ["TypeORM", "Define entities with decorators; closer to traditional ORMs like Hibernate. More flexible, but types and migrations can be rougher."],
    ],
    verdict:
      "Pick Prisma for type safety and DX on most projects; choose TypeORM if you want decorator entities or need lower-level control over queries.",
  },
  {
    t: "NestJS vs Express",
    c: "backend",
    type: "versus",
    d: "NestJS vs Express: structured framework or minimalist library? When each is the right call for your Node.js backend.",
    intro:
      "Express is the unopinionated foundation much of Node runs on; NestJS is a batteries-included framework built on top of it. The choice is really about how much structure you want handed to you.",
    picks: [
      ["Express", "Minimal, flexible, everywhere. You assemble the architecture yourself, perfect for small services and full control."],
      ["NestJS", "Opinionated modules, DI, and TypeScript-first structure out of the box. Scales cleanly to large teams and codebases."],
    ],
    verdict:
      "Use Express for small or highly custom services; adopt NestJS when you want convention, structure, and testability for a growing backend.",
  },
  {
    t: "Best API Testing Tools",
    c: "tools",
    d: "The best API testing tools in 2026 for manual exploration, automated suites, and CI, from Postman to code-first runners.",
    intro:
      "Whether you're poking at an endpoint by hand or gating a release in CI, the right API testing tool saves hours. Here are the ones worth adopting.",
    picks: [
      ["Postman", "The full-featured standard: collections, environments, mock servers, and team collaboration."],
      ["Insomnia", "A cleaner, faster open-core client that many prefer for day-to-day requests."],
      ["Bruno", "Git-friendly, offline-first API client that stores requests as files in your repo."],
      ["Hoppscotch", "Lightweight, open-source, browser-based, great for quick checks."],
      ["Playwright / Vitest + supertest", "Code-first API testing that lives in your test suite and CI."],
    ],
    verdict:
      "Use Bruno or Insomnia for a Git-friendly local workflow, Postman for team collaboration, and code-first tests for anything that must run in CI.",
  },
  {
    t: "Postman Alternatives for Developers",
    c: "tools",
    d: "Postman feeling heavy? These lighter, faster, and more Git-friendly API client alternatives are worth a switch in 2026.",
    intro:
      "Postman is powerful, but its account requirements and heft push many developers to look elsewhere. These alternatives keep the good parts and trim the rest.",
    picks: [
      ["Bruno", "Stores collections as plain files in your repo, perfect for version control and reviews."],
      ["Insomnia", "Fast, clean, and open-core with strong GraphQL and gRPC support."],
      ["Hoppscotch", "Free, open-source, and runs in the browser with a tiny footprint."],
      ["Yaak", "A newer native client focused on speed and a git-friendly local workflow."],
      ["HTTPie / curl", "Terminal-first tools that pair perfectly with scripts and CI."],
    ],
    verdict:
      "For most developers Bruno is the standout Postman replacement thanks to file-based collections you can commit alongside your code.",
  },
  {
    t: "Best Developer Tools for JavaScript",
    c: "tools",
    d: "The JavaScript tools that make 2026 productive, runtimes, package managers, bundlers, linters, and testing, curated for real projects.",
    intro:
      "The JavaScript toolchain moves fast. These are the tools that have earned a permanent place in a modern, fast, low-friction JS workflow.",
    picks: [
      ["Bun", "All-in-one runtime, bundler, and package manager that's remarkably fast."],
      ["Vite", "The bundler/dev server standard, instant HMR and a huge plugin ecosystem."],
      ["Biome", "A single fast tool for linting and formatting, replacing ESLint + Prettier for many teams."],
      ["Vitest", "Vite-native testing with a Jest-compatible API and great speed."],
      ["pnpm", "Efficient, strict package manager that saves disk and prevents phantom dependencies."],
    ],
    verdict:
      "Pair Vite (or Bun) with Vitest and Biome for a modern JS stack that's fast to run and pleasant to maintain.",
  },
  {
    t: "Best VS Code Extensions for Developers",
    c: "tools",
    d: "The VS Code extensions that actually earn their keep in 2026, for productivity, git, debugging, and a calmer editor.",
    intro:
      "A handful of well-chosen extensions turns VS Code from a good editor into a great one. These are the ones worth installing on a fresh machine.",
    picks: [
      ["GitLens", "Supercharges Git: blame annotations, history, and powerful diff views inline."],
      ["Error Lens", "Surfaces errors and warnings right on the line, no more hunting the Problems panel."],
      ["Prettier / Biome", "Consistent formatting on save across your whole team."],
      ["ESLint", "Catches bugs and enforces conventions as you type."],
      ["Path Intellisense + Auto Rename Tag", "Small quality-of-life wins you'll miss when they're gone."],
    ],
    verdict:
      "Start with GitLens, Error Lens, and a formatter, they deliver the biggest day-one improvement to your editing experience.",
  },
  {
    t: "Best Git GUI Clients",
    c: "tools",
    d: "The best Git GUI clients in 2026 for developers who want visual history, painless staging, and easier merges.",
    intro:
      "The command line is powerful, but a good Git GUI makes branching, staging hunks, and untangling merges genuinely easier, especially on big diffs.",
    picks: [
      ["GitKraken", "Beautiful cross-platform client with an intuitive commit graph and strong team features."],
      ["Fork", "Fast, native, and reasonably priced, a favourite on macOS and Windows."],
      ["Sourcetree", "Free and feature-rich, backed by Atlassian."],
      ["GitHub Desktop", "The simplest option, perfect for GitHub-centric, straightforward workflows."],
      ["Lazygit", "A keyboard-driven terminal UI for people who want speed without leaving the shell."],
    ],
    verdict:
      "Try Fork or GitKraken for a full GUI, or Lazygit if you want visual staging without leaving the terminal.",
  },
  {
    t: "Best AI Tools for Backend Developers",
    c: "ai",
    d: "AI tools that make backend developers faster in 2026, for writing APIs, queries, tests, infrastructure, and debugging.",
    intro:
      "Backend work is full of boilerplate: DTOs, migrations, tests, infra config. The right AI tools clear that away so you can focus on the hard parts.",
    picks: [
      ["Claude Code", "Reads your service, writes endpoints and tests, and runs migrations, strong for multi-file backend changes."],
      ["Cursor", "Fast inline generation for controllers, DTOs, and query code inside your editor."],
      ["GitHub Copilot", "Reliable completions for repetitive backend patterns and unit tests."],
      ["Supermaven / Codeium", "Ultra-low-latency completion if speed is your priority."],
      ["Warp AI", "AI in your terminal for crafting shell commands, Docker, and deployment scripts."],
    ],
    verdict:
      "An agentic tool like Claude Code plus a fast in-editor assistant covers most backend workflows, generation, testing, and ops.",
  },
  {
    t: "Best AWS Courses for Beginners",
    c: "career",
    d: "The best AWS courses for beginners in 2026, from certification prep to hands-on project-based learning.",
    intro:
      "AWS is huge, and that's exactly why a structured course beats wandering the docs. These are the beginner courses that build real, job-ready skills.",
    picks: [
      ["Adrian Cantrill's AWS courses", "Deep, project-heavy content widely praised for genuine understanding, not just exam tricks."],
      ["AWS Skill Builder (official)", "Free first-party learning paths straight from AWS."],
      ["Stephane Maarek (Udemy)", "The most popular certification-focused courses, clear and exam-aligned."],
      ["freeCodeCamp AWS content", "Free, long-form video courses to get started at zero cost."],
      ["A Cloud Guru", "Structured labs and learning paths with hands-on sandboxes."],
    ],
    verdict:
      "For real depth choose Cantrill; for fast certification pick Maarek. Pair either with AWS's own free hands-on labs.",
  },
  {
    t: "Best Backend Development Courses",
    c: "career",
    d: "The best backend development courses in 2026 to learn Node.js, databases, APIs, and system design the right way.",
    intro:
      "Backend engineering rewards fundamentals, HTTP, databases, auth, and system design. These courses teach them in the right order.",
    picks: [
      ["The Odin Project (NodeJS path)", "Free, project-based, and genuinely comprehensive."],
      ["Node.js courses by Andrew Mead", "A popular, hands-on path through Node, Express, and MongoDB."],
      ["NestJS Fundamentals (official)", "The best way to learn structured, scalable Node backends."],
      ["Educative / DesignGurus system design", "Level up beyond CRUD into real architecture."],
      ["Frontend Masters backend track", "High-quality, deep workshops on Node, SQL, and APIs."],
    ],
    verdict:
      "Start free with The Odin Project, then layer on a framework course (NestJS) and system design once the fundamentals click.",
  },
  {
    t: "Best Full-Stack Development Courses",
    c: "career",
    d: "The best full-stack development courses in 2026 to go from zero to shipping complete web applications.",
    intro:
      "A great full-stack course connects the dots between frontend, backend, and database so you can build and deploy a whole product. These do exactly that.",
    picks: [
      ["The Odin Project", "Free, thorough, and community-backed, full-stack JavaScript or Ruby paths."],
      ["Full Stack Open (University of Helsinki)", "Free, university-grade React/Node curriculum."],
      ["Josh Comeau's courses", "Exceptional for deep React and CSS fundamentals."],
      ["Epic Web (Kent C. Dodds)", "Modern full-stack React with a professional workflow."],
      ["Meta Front-End / Full-Stack (Coursera)", "Structured certificate path if you like guided courses."],
    ],
    verdict:
      "Full Stack Open and The Odin Project are the best free routes; add a paid course when you want polish on a specific layer.",
  },
  {
    t: "GitHub Actions CI/CD Tutorial",
    c: "devops",
    type: "tutorial",
    d: "A practical GitHub Actions tutorial: build, test, and deploy your app automatically with a clean CI/CD pipeline.",
    intro:
      "GitHub Actions turns every push into an automated build-test-deploy pipeline, all defined in a single YAML file in your repo. Let's build one from scratch.",
    steps: [
      ["Create the workflow file", "Actions live in `.github/workflows/`. Create `ci.yml` there to define your pipeline.", "name: CI\non:\n  push:\n    branches: [main]\n  pull_request:\n"],
      ["Set up the job and Node", "Each job runs on a fresh runner. Check out your code and install a Node version.", "jobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 22\n          cache: npm\n"],
      ["Install, test, and build", "Run your scripts. If any step fails, the pipeline goes red and blocks the merge.", "      - run: npm ci\n      - run: npm test\n      - run: npm run build\n"],
      ["Deploy on success", "Gate deployment on the main branch so only merged code ships.", "      - name: Deploy\n        if: github.ref == 'refs/heads/main'\n        run: npm run deploy\n        env:\n          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}\n"],
    ],
    verdict:
      "Start with build + test on every PR, then add deployment on main. Store secrets in the repo settings, never in the YAML.",
  },
  {
    t: "Docker for Node.js Developers",
    c: "devops",
    type: "tutorial",
    d: "Learn Docker for Node.js from scratch: write a lean production Dockerfile, use multi-stage builds, and run your app in a container.",
    intro:
      "Docker packages your Node.js app with everything it needs so it runs the same everywhere. Here's a clean, production-ready setup, no fluff.",
    steps: [
      ["A minimal Dockerfile", "Start from a slim Node base, copy your manifests, and install only what you need.", "FROM node:22-slim AS base\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nCMD [\"node\", \"server.js\"]\n"],
      ["Multi-stage for smaller images", "Build in one stage, ship only the result in a lean final stage.", "FROM node:22-slim AS build\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-slim\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nCMD [\"node\", \"dist/main.js\"]\n"],
      ["Add a .dockerignore", "Keep node_modules and local junk out of the build context for faster, smaller builds.", "node_modules\nnpm-debug.log\n.git\n.env\ndist\n"],
      ["Build and run", "Build the image, then run it with your port mapped.", "docker build -t my-node-app .\ndocker run -p 3000:3000 --env-file .env my-node-app\n"],
    ],
    verdict:
      "Use multi-stage builds and a slim base to keep images small, and never bake secrets into the image, pass them at runtime.",
  },
  {
    t: "How to Deploy NestJS to AWS EC2",
    c: "backend",
    type: "tutorial",
    d: "A step-by-step guide to deploying a NestJS API to an AWS EC2 instance with PM2, Nginx, and HTTPS.",
    intro:
      "Deploying NestJS to EC2 gives you a full server you control for a predictable monthly cost. Here's the production path: build, process manager, reverse proxy, and TLS.",
    steps: [
      ["Launch and connect to EC2", "Start an Ubuntu instance, open ports 22/80/443 in the security group, then SSH in.", "ssh -i key.pem ubuntu@your-ec2-ip\nsudo apt update && sudo apt install -y nginx\n"],
      ["Install Node and build the app", "Install Node, pull your code, install deps, and build.", "curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -\nsudo apt install -y nodejs\nnpm ci && npm run build\n"],
      ["Keep it alive with PM2", "PM2 restarts your API on crash and on server reboot.", "sudo npm i -g pm2\npm2 start dist/main.js --name api\npm2 startup && pm2 save\n"],
      ["Reverse proxy with Nginx + HTTPS", "Proxy port 80 to your Nest app, then add a free TLS cert with Certbot.", "server {\n  listen 80;\n  server_name api.example.com;\n  location / {\n    proxy_pass http://localhost:3000;\n    proxy_set_header Host $host;\n  }\n}\n"],
    ],
    verdict:
      "PM2 + Nginx + Certbot is the classic, reliable EC2 stack for NestJS. Automate the deploy with a GitHub Actions workflow once it works by hand.",
  },
  {
    t: "How to Deploy Next.js to Vercel",
    c: "web-development",
    type: "tutorial",
    d: "Deploy a Next.js app to Vercel in minutes, Git integration, environment variables, custom domains, and preview deployments explained.",
    intro:
      "Vercel is built by the Next.js team, so deploying is close to effortless. Here's the full path from repo to production with a custom domain.",
    steps: [
      ["Push your app to Git", "Vercel deploys from GitHub, GitLab, or Bitbucket. Make sure your project is committed and pushed.", "git init\ngit add .\ngit commit -m \"init\"\ngit push origin main\n"],
      ["Import the project", "In the Vercel dashboard choose 'Add New → Project', pick your repo, and it auto-detects Next.js. No build config needed.", "# Framework Preset: Next.js\n# Build Command:   next build (auto)\n# Output:          .next (auto)\n"],
      ["Add environment variables", "Set secrets in Project Settings → Environment Variables, scoped to Production/Preview/Development.", "DATABASE_URL=...\nNEXT_PUBLIC_SITE_URL=https://yourdomain.com\n"],
      ["Add a custom domain", "Under Settings → Domains, add your domain and point DNS at Vercel. Every push to main redeploys; every PR gets a preview URL.", "# Add: yourdomain.com\n# Vercel issues HTTPS automatically\n"],
    ],
    verdict:
      "Connect Git, set your env vars, add a domain, that's it. Preview deployments on every pull request are the feature you'll love most.",
  },
  {
    t: "Best Database Hosting Services",
    c: "devops",
    d: "The best managed database hosting services in 2026 for Postgres, MySQL, and MongoDB, compared on pricing, scaling, and DX.",
    intro:
      "Running your own database server is a job nobody asked for. Managed database hosting handles backups, scaling, and failover so you can just connect and build.",
    picks: [
      ["Neon", "Serverless Postgres with branching, spin up a database per pull request. Generous free tier."],
      ["Supabase", "Postgres plus auth, storage, and realtime, a full backend around your database."],
      ["PlanetScale", "Serverless MySQL with painless, non-blocking schema changes."],
      ["MongoDB Atlas", "The managed home for MongoDB, with global clusters and search."],
      ["Railway / Render Postgres", "Simple managed Postgres that sits right next to your app."],
    ],
    verdict:
      "For Postgres, Neon and Supabase lead on developer experience; choose Atlas for MongoDB and PlanetScale if you're on MySQL.",
  },
  {
    t: "Best Email APIs for Developers",
    c: "tools",
    d: "The best transactional email APIs in 2026, Resend, Postmark, SendGrid and more, compared on deliverability, DX, and price.",
    intro:
      "Sending email reliably is harder than it looks, deliverability, DKIM, bounces, templates. A good email API handles the hard parts so your app's mail actually lands.",
    picks: [
      ["Resend", "Developer-first API with a clean SDK and React Email templates. The modern default."],
      ["Postmark", "Renowned for fast, reliable transactional deliverability and great analytics."],
      ["SendGrid", "Battle-tested at scale with a huge feature set."],
      ["Amazon SES", "The cheapest at volume if you're comfortable wiring it up yourself."],
      ["Loops / Mailgun", "Strong options for product and marketing email respectively."],
    ],
    verdict:
      "Resend offers the best developer experience for most apps; choose Postmark when deliverability is mission-critical, or SES to minimise cost at scale.",
  },
  {
    t: "Best SMS APIs for Developers",
    c: "tools",
    d: "The best SMS APIs in 2026 for OTPs, notifications, and two-way messaging, compared on coverage, pricing, and ease of use.",
    intro:
      "From login OTPs to delivery alerts, SMS is still the most universal notification channel. These APIs make sending it a couple of lines of code.",
    picks: [
      ["Twilio", "The industry standard: global reach, rich features, and excellent docs."],
      ["Vonage (Nexmo)", "Strong global coverage and competitive pricing."],
      ["Africa's Talking", "The go-to for SMS (and USSD/airtime) across African markets."],
      ["Termii", "Popular in Nigeria and West Africa for OTPs and messaging."],
      ["MessageBird / Plivo", "Solid global alternatives with good pricing at volume."],
    ],
    verdict:
      "Twilio is the safe global choice; for African markets, Africa's Talking or Termii often mean better rates and local sender support.",
  },
  {
    t: "Best Payment APIs for Nigerian Developers",
    c: "tools",
    featured: true,
    d: "The best payment APIs for Nigerian developers in 2026, Paystack, Flutterwave, and more compared on fees, features, and integration.",
    intro:
      "Accepting payments in Nigeria means picking a gateway that handles cards, bank transfers, and USSD reliably, with sane fees and a developer-friendly API. Here are the leaders.",
    picks: [
      ["Paystack", "Clean API, excellent docs, and reliable local payments. The developer favourite in Nigeria."],
      ["Flutterwave", "Broad pan-African coverage and many payment methods, good for cross-border."],
      ["Monnify", "Competitive fees and strong bank-transfer/virtual-account support."],
      ["Squad (by GTCO)", "Growing option with virtual accounts and competitive pricing."],
      ["Stripe (via workarounds)", "Not officially local, but relevant for developers billing internationally."],
    ],
    verdict:
      "For most Nigerian developers Paystack offers the best API and docs; choose Flutterwave when you need wider pan-African coverage.",
  },
  {
    t: "Best Cloud Services for Startups",
    c: "devops",
    d: "The best cloud services for startups in 2026, balancing free credits, simplicity, and room to scale without surprise bills.",
    intro:
      "The right cloud for a startup optimises for speed and predictable cost today, with a clear path to scale tomorrow. These platforms hit that balance.",
    picks: [
      ["Vercel", "Ship your product's frontend and full-stack app with zero ops and preview deploys."],
      ["Railway / Render", "Managed backends and databases with minimal configuration, ideal for small teams."],
      ["Supabase / Neon", "Instant Postgres backends with auth and storage, generous free tiers."],
      ["AWS (with Activate credits)", "Room to scale to anything, plus startup credit programs."],
      ["Cloudflare", "Cheap, global edge compute, storage, and a strong free tier."],
    ],
    verdict:
      "Most startups move fastest on a managed stack (Vercel + Railway/Render + a serverless Postgres), keeping AWS in reserve for when scale demands it.",
  },
];

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function renderRoundup(p) {
  const lead = p.type === "versus" ? "The contenders" : "The top picks";
  const picksMd = p.picks
    .map(([name, note]) => `### ${name}\n\n${note}\n`)
    .join("\n");
  const table = [
    p.type === "versus" ? "| Option | Best for |" : "| Pick | Why it stands out |",
    "| --- | --- |",
    ...p.picks.map(([n, note]) => `| **${n}** | ${note.split(".")[0]}. |`),
  ].join("\n");

  return `## Introduction

${p.intro}

In this guide we break down the strongest options, what separates them, and a clear recommendation so you can decide quickly and get back to building.

## What to look for

Before comparing names, get clear on your own priorities. The factors that matter most here:

- **Fit for your stack**, the best tool is the one that matches how you already work.
- **Pricing and value**, weigh the real cost against the time it saves you.
- **Developer experience**, good docs and a clean API compound every single day.
- **Scalability**, will it still fit when your project (or team) grows?

## ${lead}

${picksMd}
## Quick comparison

${table}

## Frequently asked questions

**Which should I choose if I'm just starting out?**
Start with the option that has the gentlest learning curve and best documentation, you can always switch once you understand your needs better.

**Is the most popular option always the best?**
No. Popularity means more tutorials and community help, but the *right* choice depends on your specific stack, budget, and goals.

## Final verdict

${p.verdict}

*This is a living guide, I update it as tools evolve. Have a suggestion? [Get in touch](/contact).*
`;
}

function renderTutorial(p) {
  const body = p.steps
    .map(
      ([title, text, code], i) =>
        `## Step ${i + 1}: ${title}\n\n${text}\n\n\`\`\`${codeLang(p, code)}\n${code}\`\`\`\n`
    )
    .join("\n");
  return `## Introduction

${p.intro}

By the end of this tutorial you'll have a working setup you can drop straight into a real project. Let's get into it.

${body}
## Wrapping up

${p.verdict}

If you found this useful, [subscribe](/#subscribe) for more hands-on guides, or [reach out](/contact) with questions.
`;
}

function codeLang(p, code) {
  if (/```|FROM |CMD |docker/.test(code)) return "dockerfile";
  if (/^name:|jobs:|runs-on:|server \{/.test(code) || /uses:/.test(code))
    return "yaml";
  if (/^ssh |sudo |curl |npm |git |pm2 |docker /.test(code.trim())) return "bash";
  return "bash";
}

let written = 0;
posts.forEach((p, i) => {
  const slug = slugify(p.t);
  const file = path.join(OUT, `${slug}.mdx`);

  // Don't clobber a file that's been hand-expanded (marker removed).
  if (fs.existsSync(file)) {
    const cur = fs.readFileSync(file, "utf8");
    if (!cur.includes(GEN_MARK)) return;
  }

  const keywords = [
    p.t.toLowerCase(),
    ...p.picks
      ? p.picks.map(([n]) => n.toLowerCase())
      : [],
  ].slice(0, 8);

  const body =
    p.type === "tutorial" ? renderTutorial(p) : renderRoundup(p);

  const fm = [
    "---",
    `title: ${JSON.stringify(p.t)}`,
    `description: ${JSON.stringify(p.d)}`,
    `category: ${p.c}`,
    `date: "${dateFor(i)}"`,
    p.featured ? "featured: true" : null,
    `keywords: ${JSON.stringify(keywords)}`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(file, `${fm}\n\n${GEN_MARK}\n\n${body}`);
  written++;
});

console.log(`Generated ${written} / ${posts.length} articles into content/blog`);
