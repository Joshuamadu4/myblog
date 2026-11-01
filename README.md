# DevInsights: a fast, SEO-first developer blog

Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, **GSAP** animations, and **MDX** content. Apple-inspired: generous whitespace, crisp type, smooth scroll reveals.

## The 30-day drip

The 30 launch articles live in `content/blog/*.mdx`. Each has a `date` in its
frontmatter and **publishes automatically on that day**, one per day from
**2026-08-16 → 2026-09-14**. Pages use ISR (`revalidate = 3600`), so a new
article goes live within an hour of its date with no redeploy.

- **Public site** shows only articles whose date has arrived.
- **Upcoming** articles appear in the *Content calendar* on `/blog`.
- To preview the whole site (all 30) while writing, set
  `NEXT_PUBLIC_PREVIEW_ALL=1` (already set in `.env.local` for local dev).
  **Leave it unset in production** so the drip works.

### Reschedule or reorder
Edit the `date:` field in any `content/blog/*.mdx` file, or re-run the
generator: `node scripts/gen-content.mjs` (it won't clobber files you've
hand-edited, which removes the `{/* generated:starter */}` marker).

## Add your photo
Drop your headshot at **`public/joshua.jpg`** (the About page uses it; until
then it shows a clean monogram fallback).

## Develop
```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Deploy (Vercel)
1. Push to GitHub.
2. Import the repo at vercel.com. Next.js is auto-detected, zero config.
3. **Do not** set `NEXT_PUBLIC_PREVIEW_ALL` in Vercel (keeps the drip on).
4. Set your real domain, then update `site.url` in `src/lib/site.ts`
   (used for canonical URLs, sitemap, and Open Graph).

## SEO built in
- Per-page metadata, canonical URLs, Open Graph + Twitter cards
- `BlogPosting` + `BreadcrumbList` + `WebSite` JSON-LD structured data
- Auto `sitemap.xml` (published posts only) and `robots.txt`
- Scheduled posts are `noindex` until they go live

## Project map
```
src/lib/site.ts          # site + author config (edit me)
src/lib/categories.ts    # the 6 topics
src/lib/blog.ts          # MDX loader + publish scheduling
content/blog/*.mdx       # the 30 articles
scripts/gen-content.mjs  # regenerate/reschedule articles
```
