"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <p className="text-xs font-semibold uppercase tracking-wider text-faint">
        On this page
      </p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block border-l-2 py-1 text-sm transition-colors ${
                item.level === 3 ? "pl-6" : "pl-4"
              } ${
                active === item.id
                  ? "border-brand font-medium text-brand-700"
                  : "border-transparent text-muted hover:text-ink"
              }`}
            >
              {item.level === 2 ? `${romanOrNum(i, items)}. ` : ""}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function romanOrNum(index: number, items: TocItem[]): number {
  // number only the h2 headings sequentially
  return items.slice(0, index + 1).filter((i) => i.level === 2).length;
}
