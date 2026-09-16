import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social preview card. Verified content only — name, roles, and the
 * existing site description — rendered in the portfolio's light theme
 * with system fonts (no external requests at render time).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "96px",
          backgroundColor: "#0a0a0b",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "999px",
              backgroundColor: "#14b8a6",
            }}
          />
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "3px",
              color: "#857f75",
            }}
          >
            AI · FULL-STACK · PRODUCT ENGINEERING
          </div>
        </div>
        <div
          style={{
            fontSize: "104px",
            fontWeight: 700,
            letterSpacing: "-3px",
            color: "#f2f0eb",
            lineHeight: 1.05,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            marginTop: "24px",
            fontSize: "32px",
            color: "#b3aea4",
            maxWidth: "900px",
            lineHeight: 1.4,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
