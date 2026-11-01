export const site = {
  name: "DevInsights",
  tagline: "Practical Insights. Better Developers.",
  description:
    "Tutorials, tools, and real-world guides to help you build, deploy, and grow as a software engineer.",
  url: "https://devinsights.dev",
  author: {
    name: "Joshua Madu",
    role: "Software Engineer & Technical Writer",
    image: "/joshua.jpg",
    location: "Nigeria",
    email: "hello@devinsights.dev",
    twitter: "@joshuamadu_dev",
    linkedin: "linkedin.com/in/joshuamadu",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Categories", href: "/categories" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
  ],
  social: {
    twitter: "https://twitter.com/joshuamadu_dev",
    linkedin: "https://linkedin.com/in/joshuamadu",
    github: "https://github.com/joshuamadu",
  },
} as const;

export type Site = typeof site;
