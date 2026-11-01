import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { Mail, Twitter, LinkedIn, MapPin } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Have a question, suggestion or partnership idea? Get in touch with Joshua Madu at DevInsights.",
  alternates: { canonical: "/contact" },
};

const details = [
  { Icon: Mail, label: "Email", value: site.author.email, href: `mailto:${site.author.email}` },
  { Icon: Twitter, label: "Twitter / X", value: site.author.twitter, href: site.social.twitter },
  { Icon: LinkedIn, label: "LinkedIn", value: site.author.linkedin, href: site.social.linkedin },
  { Icon: MapPin, label: "Location", value: site.author.location },
];

export default function ContactPage() {
  return (
    <div className="container-page py-14">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand">
            Contact me
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Let&apos;s connect!
          </h1>
          <p className="mt-4 max-w-md text-lg text-muted">
            Have a question, suggestion or partnership idea? I&apos;d love to
            hear from you.
          </p>

          <ul className="mt-9 space-y-5">
            {details.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-faint">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium text-ink hover:text-brand"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium text-ink">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
