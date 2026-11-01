"use client";

import { useEffect, useRef } from "react";
import { giscus, giscusConfigured } from "@/lib/comments";

/**
 * Giscus comments widget. Readers sign in with GitHub and their comments are
 * stored as replies in your repo's GitHub Discussions. The script is injected
 * client-side and mapped per-post by pathname; theme follows the viewer's
 * light/dark preference automatically ("preferred_color_scheme").
 */
export function Comments() {
  const ref = useRef<HTMLDivElement>(null);
  const configured = giscusConfigured();

  useEffect(() => {
    const el = ref.current;
    if (!configured || !el) return;
    // Guard against double-injection (e.g. client navigation / fast refresh).
    if (el.querySelector("script[src='https://giscus.app/client.js']")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";

    const attrs: Record<string, string> = {
      "data-repo": giscus.repo,
      "data-repo-id": giscus.repoId,
      "data-category": giscus.category,
      "data-category-id": giscus.categoryId,
      "data-mapping": "pathname",
      "data-strict": "0",
      "data-reactions-enabled": "1",
      "data-emit-metadata": "0",
      "data-input-position": "top",
      "data-theme": "preferred_color_scheme",
      "data-lang": "en",
      "data-loading": "lazy",
    };
    for (const [k, v] of Object.entries(attrs)) script.setAttribute(k, v);

    el.appendChild(script);
  }, [configured]);

  if (!configured) {
    return (
      <section className="mt-12 rounded-2xl border border-dashed border-line p-6 text-sm">
        <p className="font-semibold text-ink">Comments aren&apos;t set up yet</p>
        <p className="mt-1 text-muted">
          Add your Giscus values in <code>src/lib/comments.ts</code> to let
          readers comment and ask questions. See <code>COMMENTS_SETUP.md</code>{" "}
          for the one-time setup.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-12" aria-label="Comments and questions">
      <h2 className="text-lg font-bold text-ink">Comments &amp; questions</h2>
      <p className="mt-1 text-sm text-muted">
        Sign in with GitHub to share your opinion or ask a question.
      </p>
      <div ref={ref} className="mt-4" />
    </section>
  );
}
