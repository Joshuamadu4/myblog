import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Shared Open Graph / Twitter card renderer. Produces a 1200×630 PNG that
 * echoes the dark, grid-lined `Thumb` aesthetic used across the site, so link
 * previews on Google, X, LinkedIn, and Slack stay on-brand. Uses the built-in
 * font (no asset fetch) and only inline styles, per the satori/next-og rules.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function ogImageResponse({
  title,
  kicker,
}: {
  title: string;
  kicker?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          color: "#e2e8f0",
          backgroundColor: "#060912",
          backgroundImage:
            "radial-gradient(120% 120% at 15% 0%, #16213e 0%, #0b1220 55%, #060912 100%)",
        }}
      >
        {/* top row: brand + kicker */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 14,
                backgroundColor: "#2563eb",
                color: "#ffffff",
                fontSize: 34,
                fontWeight: 700,
              }}
            >
              {site.name.charAt(0)}
            </div>
            <span style={{ fontWeight: 700, color: "#ffffff" }}>
              {site.name}
            </span>
          </div>
          {kicker ? (
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: 24,
                color: "#60a5fa",
                fontWeight: 600,
              }}
            >
              {kicker}
            </span>
          ) : (
            <span />
          )}
        </div>

        {/* title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 52 ? 60 : 74,
            lineHeight: 1.1,
            fontWeight: 700,
            color: "#ffffff",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* footer: author + domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#94a3b8",
          }}
        >
          <span>{site.author.name}</span>
          <span style={{ color: "#60a5fa" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
