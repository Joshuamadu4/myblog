import { Twitter, LinkedIn, Mail } from "./icons";

export function ShareLinks({ title, url }: { title: string; url: string }) {
  const enc = encodeURIComponent;
  const links = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
      Icon: Twitter,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      Icon: LinkedIn,
    },
    {
      label: "Share via email",
      href: `mailto:?subject=${enc(title)}&body=${enc(url)}`,
      Icon: Mail,
    },
  ];
  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-9 w-9 place-items-center rounded-full border border-line text-body transition-colors hover:border-brand hover:text-brand"
        >
          <Icon className="h-[18px] w-[18px]" />
        </a>
      ))}
    </div>
  );
}
