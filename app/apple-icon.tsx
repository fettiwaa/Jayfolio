import { ImageResponse } from "next/og";

// Home-screen icon for iOS; the same "J" monogram as app/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0d0f12",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 32 32">
        <path
          d="M19.5 8v10.5a5 5 0 0 1-10 0"
          fill="none"
          stroke="#f0f0f0"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    size,
  );
}
