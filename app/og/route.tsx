import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

// Share-preview image (Open Graph / Twitter), 1200×630, rendered once at build
// time. Satori layout: every element with more than one child uses flex.
export const dynamic = "force-static";

const SIZE = { width: 1200, height: 630 };
const HOST = "jayfolio-fty.vercel.app";

const color = {
  bg: "#0d0d0f",
  panel: "#171719",
  inset: "#1d1d21",
  border: "#303036",
  text: "#f2f2f2",
  muted: "#8a8a93",
};

// The first file that exists is used: a dedicated share picture, else the profile photo.
const IMAGE_CANDIDATES = [
  { file: "share.jpg", mime: "image/jpeg" },
  { file: "share.png", mime: "image/png" },
  { file: "profile.jpg", mime: "image/jpeg" },
];

function readShareImage(): string {
  const dir = path.join(process.cwd(), "public", "images");
  for (const { file, mime } of IMAGE_CANDIDATES) {
    const full = path.join(dir, file);
    if (fs.existsSync(full)) {
      return `data:${mime};base64,${fs.readFileSync(full).toString("base64")}`;
    }
  }
  throw new Error(`No share image found in ${dir}`);
}

export async function GET() {
  const image = readShareImage();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 40,
        backgroundColor: color.bg,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          border: `1px solid ${color.border}`,
          borderRadius: 16,
          backgroundColor: color.panel,
          overflow: "hidden",
        }}
      >
        {/* Picture, framed like the site's inset panels */}
        <div
          style={{
            display: "flex",
            padding: 20,
            borderRight: `1px solid ${color.border}`,
            backgroundColor: color.inset,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain img only */}
          <img
            src={image}
            alt=""
            width={508}
            height={508}
            style={{ objectFit: "cover", borderRadius: 10 }}
          />
        </div>

        {/* Wordmark */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "36px 44px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="36" height="36" viewBox="0 0 32 32">
              <rect width="32" height="32" rx="7" fill={color.text} />
              <path
                d="M19.5 8v10.5a5 5 0 0 1-10 0"
                fill="none"
                stroke={color.bg}
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 3,
                color: color.muted,
              }}
            >
              ~/&nbsp;<span style={{ color: color.text }}>jayfolio</span>
            </div>
          </div>

          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -5,
              lineHeight: 1,
              color: color.text,
            }}
          >
            Jayfolio
          </div>

          <div
            style={{
              display: "flex",
              paddingTop: 20,
              borderTop: `1px solid ${color.border}`,
              fontSize: 22,
              letterSpacing: 1,
              color: color.muted,
            }}
          >
            {HOST}
          </div>
        </div>
      </div>
    </div>,
    SIZE,
  );
}
