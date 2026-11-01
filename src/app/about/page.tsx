import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ProfilePhoto } from "@/components/profile-photo";
import { Check, ArrowRight } from "@/components/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Joshua Madu, a software engineer and technical writer sharing practical knowledge to help developers build better software.",
  alternates: { canonical: "/about" },
};

const highlights = [
  "5+ years of coding experience",
  "Backend & DevOps enthusiast",
  "Technical writer & content creator",
  "Helping developers grow every day",
];

const stats = [
  ["100+", "Articles Published"],
  ["50K+", "Monthly Readers"],
  ["20K+", "Newsletter Subscribers"],
  ["5+", "Years of Experience"],
];

export default function AboutPage() {
  return (
    <div className="container-page py-14">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">
            About me
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            I&apos;m {site.author.name}.
          </h1>
          <p className="mt-4 text-lg text-body">
            A software engineer and technical writer. I build backend systems
            with Node.js, NestJS and databases, and enjoy sharing practical
            knowledge that helps developers ship better software.
          </p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-body">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-6 py-3 font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Read the blog
            </Link>
          </div>
        </div>

        <div className="reveal relative mx-auto w-full max-w-sm">
          <ProfilePhoto
            src={site.author.image}
            alt={`${site.author.name}, ${site.author.role}`}
            monogram={site.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          />
        </div>
      </div>

      <div
        data-stagger
        className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-10 lg:grid-cols-4"
      >
        {stats.map(([n, l]) => (
          <div key={l} className="reveal text-center sm:text-left">
            <p className="text-3xl font-bold text-ink sm:text-4xl">{n}</p>
            <p className="mt-1 text-sm text-muted">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
