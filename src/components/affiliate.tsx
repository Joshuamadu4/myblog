import type { ReactNode } from "react";
import { getAffiliate } from "@/lib/affiliates";
import { ArrowUpRight } from "@/components/icons";

/**
 * Affiliate MDX components. All read their URL from src/lib/affiliates.ts via
 * the `id` prop, so links are edited in one place. Every outbound link carries
 * rel="sponsored nofollow noopener noreferrer", the correct SEO/FTC signal, and
 * it keeps affiliate pages from diluting your own ranking.
 *
 * An unknown id never breaks the build: inline links fall back to their text,
 * the button/box render nothing.
 */

const REL = "sponsored nofollow noopener noreferrer";

/** Inline text link: <Aff id="cursor">Cursor</Aff> */
export function Aff({ id, children }: { id: string; children?: ReactNode }) {
  const a = getAffiliate(id);
  if (!a) return <>{children}</>;
  return (
    <a href={a.url} target="_blank" rel={REL}>
      {children ?? a.name}
    </a>
  );
}

/** CTA button: <AffButton id="cursor">Try Cursor →</AffButton> */
export function AffButton({ id, children }: { id: string; children?: ReactNode }) {
  const a = getAffiliate(id);
  if (!a) return null;
  return (
    <a
      href={a.url}
      target="_blank"
      rel={REL}
      className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold !text-white !no-underline hover:bg-brand-700"
    >
      {children ?? a.cta ?? `Get ${a.name}`}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  );
}

/** Recommendation card: <AffBox id="cursor" /> (optional children override the blurb) */
export function AffBox({ id, children }: { id: string; children?: ReactNode }) {
  const a = getAffiliate(id);
  if (!a) return null;
  const blurb = children ?? a.blurb;
  return (
    <div className="my-6 flex flex-col gap-4 rounded-2xl border border-line bg-bg-subtle p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-ink">{a.name}</p>
          <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-brand">
            Affiliate
          </span>
        </div>
        {blurb ? <p className="mt-1 text-sm text-muted">{blurb}</p> : null}
      </div>
      <a
        href={a.url}
        target="_blank"
        rel={REL}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold !text-white !no-underline hover:bg-brand-700"
      >
        {a.cta ?? "Learn more"}
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}

/** FTC disclosure line. Drop <AffDisclosure /> near the top of monetized posts. */
export function AffDisclosure() {
  return (
    <p className="my-4 rounded-lg border border-line bg-bg-subtle px-4 py-2 text-xs text-muted">
      Some links in this article are affiliate links. If you buy through them, we
      may earn a small commission at no extra cost to you. It helps keep the blog
      free.
    </p>
  );
}
