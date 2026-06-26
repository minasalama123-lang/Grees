import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

/**
 * Site-wide social share image (1200×630). Used automatically by any page that
 * doesn't set its own Open Graph image (product/category pages use their own
 * photo). Generated at build with next/og — no static asset to maintain.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f3a63",
          color: "#f6f3ee",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", fontSize: 132 }}>
          <span>Grees</span>
          <span style={{ color: "#9c7a4d", marginLeft: 10 }}>&amp;</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 34,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#e8e2d8",
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
