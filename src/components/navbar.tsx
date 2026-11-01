"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { CodeGlyph, Search, Menu, Close } from "./icons";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-white/0"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
            <CodeGlyph className="h-4 w-4" />
          </span>
          <span className="text-lg tracking-tight">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-brand-700"
                    : "text-body hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            aria-label="Search articles"
            className="grid h-9 w-9 place-items-center rounded-full text-body transition-colors hover:bg-bg-subtle hover:text-ink"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            href="/#subscribe"
            className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-700 hover:shadow-md sm:inline-flex"
          >
            Subscribe
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-9 w-9 place-items-center rounded-full text-ink md:hidden"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <ul className="container-page flex flex-col py-3">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-2.5 text-[0.95rem] font-medium ${
                    isActive(item.href)
                      ? "bg-brand-50 text-brand-700"
                      : "text-body"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-1">
              <Link
                href="/#subscribe"
                className="block rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
