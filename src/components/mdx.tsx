import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { ComponentProps } from "react";
import { Aff, AffButton, AffBox, AffDisclosure } from "@/components/affiliate";

const components = {
  a: ({ href = "", ...props }: ComponentProps<"a">) => {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) return <Link href={href} {...props} />;
    return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
  },
  img: (props: ComponentProps<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={props.alt ?? ""} loading="lazy" {...props} />
  ),
  Callout: ({ children }: { children: React.ReactNode }) => (
    <div className="my-6 rounded-xl border border-brand-100 bg-brand-50 p-4 text-[0.95rem] text-body">
      {children}
    </div>
  ),
  Image,
  Aff,
  AffButton,
  AffBox,
  AffDisclosure,
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "github-dark-dimmed",
          keepBackground: false,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: { "data-autolink": "true" },
        },
      ],
    ],
  },
} satisfies MDXRemoteProps["options"];

export function Mdx({ source }: { source: string }) {
  return (
    <div className="prose-article">
      <MDXRemote source={source} components={components} options={options} />
    </div>
  );
}
