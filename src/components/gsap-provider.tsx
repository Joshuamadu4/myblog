"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll-reveal choreography. Any element with `.reveal` fades and rises
 * into place as it enters the viewport. `[data-stagger]` containers cascade
 * their `.reveal` children. Re-initialises on route change.
 */
export function GsapProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Signal to CSS that JS is on (so reveals start hidden).
    document.documentElement.classList.remove("no-js");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach((el) =>
        el.classList.add("is-in")
      );
      return;
    }

    const ctx = gsap.context(() => {
      // Staggered groups
      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>(".reveal");
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: group,
            start: "top 82%",
            once: true,
          },
          onStart: () => items.forEach((i) => i.classList.add("is-in")),
        });
      });

      // Standalone reveals (not inside a stagger group)
      gsap.utils
        .toArray<HTMLElement>(".reveal")
        .filter((el) => !el.closest("[data-stagger]"))
        .forEach((el) => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
            onStart: () => el.classList.add("is-in"),
          });
        });
    });

    // Ensure positions are correct after fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    const t = setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
