"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight } from "./icons";

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduce) {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from("[data-hero='eyebrow']", { y: 16, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero='title'] > span",
          { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.3"
        )
        .from(
          "[data-hero='sub']",
          { y: 20, opacity: 0, duration: 0.7 },
          "-=0.5"
        )
        .from(
          "[data-hero='cta'] > *",
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .from(
          "[data-hero='art']",
          { y: 40, opacity: 0, scale: 0.96, duration: 1.1 },
          "-=0.9"
        )
        .from(
          "[data-float]",
          { scale: 0, opacity: 0, duration: 0.6, stagger: 0.08 },
          "-=0.7"
        );

      // gentle floating loop for the badges
      gsap.to("[data-float]", {
        y: "-=8",
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden"
    >
      {/* soft background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-brand-50 blur-[120px]" />
      </div>

      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <span
            data-hero="eyebrow"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Welcome to DevInsights
          </span>

          <h1
            data-hero="title"
            className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            <span className="block">Practical Insights.</span>
            <span className="block text-gradient-brand">Better Developers.</span>
          </h1>

          <p
            data-hero="sub"
            className="mt-6 max-w-xl text-lg leading-relaxed text-body"
          >
            Tutorials, tools, and real-world guides to help you build, deploy,
            and grow as a software engineer.
          </p>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md"
            >
              Explore Articles <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#subscribe"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Subscribe
            </Link>
          </div>

          <dl className="mt-10 flex gap-8">
            {[
              ["30+", "Guides & tutorials"],
              ["6", "Topics covered"],
              ["Daily", "New content"],
            ].map(([n, l]) => (
              <div key={l}>
                <dt className="text-2xl font-bold text-ink">{n}</dt>
                <dd className="text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroArt />
      </div>
    </section>
  );
}

function HeroArt() {
  return (
    <div data-hero="art" className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* editor window */}
      <div className="relative rounded-2xl border border-line bg-bg-dark shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-white/40">
            app/page.tsx
          </span>
        </div>
        <pre className="overflow-hidden px-5 py-4 font-mono text-[0.8rem] leading-6">
          <code className="block">
            <Line>
              <K>export default function</K> <F>Page</F>() {"{"}
            </Line>
            <Line indent={1}>
              <K>return</K> (
            </Line>
            <Line indent={2}>
              <T>&lt;main</T> <A>className</A>=<S>&quot;ship&quot;</S><T>&gt;</T>
            </Line>
            <Line indent={3}>
              <T>&lt;h1&gt;</T>Build. Deploy. Grow.<T>&lt;/h1&gt;</T>
            </Line>
            <Line indent={2}>
              <T>&lt;/main&gt;</T>
            </Line>
            <Line indent={1}>);</Line>
            <Line>{"}"}</Line>
          </code>
        </pre>
      </div>

      {/* floating tech badges */}
      <Badge className="-left-5 top-8" label="TS" color="#3178c6" />
      <Badge className="-right-4 top-20" label="⚛" color="#38bdf8" />
      <Badge className="-left-3 bottom-10" label="{ }" color="#4ade80" />
      <Badge className="-right-6 -bottom-4" label="▲" color="#0f172a" light />
    </div>
  );
}

function Badge({
  className = "",
  label,
  color,
  light = false,
}: {
  className?: string;
  label: string;
  color: string;
  light?: boolean;
}) {
  return (
    <div
      data-float
      className={`absolute grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white font-mono text-lg font-bold shadow-[var(--shadow-card)] ${className}`}
      style={{ color: light ? "#0f172a" : color }}
    >
      {label}
    </div>
  );
}

const Line = ({
  children,
  indent = 0,
}: {
  children: React.ReactNode;
  indent?: number;
}) => (
  <span className="block text-white/80" style={{ paddingLeft: indent * 14 }}>
    {children}
  </span>
);
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#c792ea]">{children}</span>
);
const F = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#82aaff]">{children}</span>
);
const T = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#f07178]">{children}</span>
);
const A = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#ffcb6b]">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#c3e88d]">{children}</span>
);
