import Link from "next/link";
import { site } from "@/lib/site";
import { categories } from "@/lib/categories";
import { CodeGlyph, Twitter, LinkedIn, GitHub } from "./icons";

export function Footer() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line bg-bg-subtle">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 font-bold text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">
              <CodeGlyph className="h-4 w-4" />
            </span>
            <span className="text-lg">{site.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.description}
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { href: site.social.twitter, Icon: Twitter, label: "Twitter" },
              { href: site.social.linkedin, Icon: LinkedIn, label: "LinkedIn" },
              { href: site.social.github, Icon: GitHub, label: "GitHub" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-body transition-colors hover:border-brand hover:text-brand"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Categories", href: "/categories" },
            { label: "Resources", href: "/resources" },
          ]}
        />

        <FooterCol
          title="Topics"
          links={categories.slice(0, 5).map((c) => ({
            label: c.name,
            href: `/categories/${c.key}`,
          }))}
        />

        <FooterCol
          title="Company"
          links={[
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
            { label: "Subscribe", href: "/#subscribe" },
          ]}
        />
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {site.name}. Built by {site.author.name}.
          </p>
          <p>Crafted with Next.js for speed, accessibility, and SEO.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-body transition-colors hover:text-brand"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
