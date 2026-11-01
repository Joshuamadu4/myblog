import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const CodeGlyph = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m8 8-4 4 4 4" />
    <path d="m16 8 4 4-4 4" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

export const ArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const Clock = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Calendar = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v3M16 3v3" />
  </svg>
);

export const Bookmark = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 4h12v16l-6-4-6 4z" />
  </svg>
);

export const Menu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Close = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6 18 18M18 6 6 18" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 12 5 5L20 6" />
  </svg>
);

export const Mail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const MapPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Twitter = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4l7 9m0 0-7 7m7-7 6 7h3l-7-9m0 0 6.5-7M11 13 4.5 4" />
  </svg>
);

export const LinkedIn = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7" />
  </svg>
);

export const GitHub = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.5 1.3a12 12 0 0 0-6 0C6 .7 5 1 5 1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 7.4c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V19" />
  </svg>
);

// ---- category icons ----
export const CatLayout = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);
export const CatServer = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="4" width="18" height="7" rx="2" />
    <rect x="3" y="13" width="18" height="7" rx="2" />
    <path d="M7 7.5v.01M7 16.5v.01" />
  </svg>
);
export const CatInfinity = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 8a4 4 0 1 0 0 8c2.2 0 3.3-1.6 4.7-3.4C12.6 10.1 13.9 8 16.5 8a4 4 0 1 1 0 8c-2.6 0-3.9-2.1-5.8-4.6C9.3 9.6 8.2 8 6 8Z" />
  </svg>
);
export const CatWrench = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M14.5 5.5a3.5 3.5 0 0 0 4.6 4.6l-9.2 9.2a2.1 2.1 0 0 1-3-3l9.2-9.2Z" />
    <path d="M14.5 5.5 18 9" />
  </svg>
);
export const CatUser = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
);
export const CatSparkles = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Z" />
    <path d="M18 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z" />
  </svg>
);

const catIcons = {
  layout: CatLayout,
  server: CatServer,
  infinity: CatInfinity,
  wrench: CatWrench,
  user: CatUser,
  sparkles: CatSparkles,
} as const;

export function CategoryIcon({
  name,
  ...props
}: { name: string } & IconProps) {
  const Cmp = catIcons[name as keyof typeof catIcons] ?? CatLayout;
  return <Cmp {...props} />;
}
