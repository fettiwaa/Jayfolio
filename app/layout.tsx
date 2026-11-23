import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ChatButton from "@/components/chat/chat-button";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Inter, JetBrains_Mono } from "next/font/google";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
// Labels, dates, stats and panel headers: the "technical interface" voice.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

// Mobile browser bar colour matches the page background in each theme.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0f" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f5" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Jaycee Andal — Full Stack Developer",
    template: "%s | Jaycee Andal",
  },
  description:
    "Portfolio of Jaycee Andal — Computer Science Student and Full Stack Developer",
  keywords: [
    "portfolio",
    "web development",
    "full stack",
    "react",
    "next.js",
    "typescript",
  ],
  authors: [{ name: "Jaycee Andal" }],
  creator: "Jaycee Andal",
  metadataBase: new URL("https://jayfolio-fty.vercel.app"),
  alternates: {
    canonical: "/",
  },
  // Icons come from app/icon.svg and app/apple-icon.tsx (Next.js file conventions).
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jayfolio-fty.vercel.app",
    // Share previews: just "Jayfolio" (owner's request, 2026-11-23).
    siteName: "Jayfolio",
    title: "Jayfolio",
    description: "Portfolio of Jaycee Andal, Computer Science student.",
    images: ["/og?v=2"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jayfolio",
    description: "Portfolio of Jaycee Andal, Computer Science student.",
    images: ["/og?v=2"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: THEME_INIT_SCRIPT may change data-theme before React loads.
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className="min-h-screen bg-(--theme-bg) text-(--theme-text) antialiased">
        <a href="#main" className="skip-to-content">
          Skip to content
        </a>
        <ThemeProvider>
          <Nav />
          <main id="main" className="pt-16">
            {children}
          </main>
          <Footer />
          <ChatButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
