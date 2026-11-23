"use client";

import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { emailComposeUrl, site } from "@/lib/constants";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  { href: site.github, label: "GitHub", icon: GitHubIcon },
  { href: site.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: emailComposeUrl, label: "Email", icon: Mail },
];

/** Status-bar footer: current path, credits, social links. */
export default function Footer() {
  const pathname = usePathname();
  const path = pathname === "/" ? "~" : `~${pathname}`;

  return (
    <footer className="border-t border-(--theme-border) bg-(--theme-surface)">
      <div className="max-width-content mx-auto section-padding-x py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-label text-(--theme-text-muted) flex items-center gap-2 order-2 sm:order-1">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full bg-(--theme-text-muted)"
          />
          <span>
            jayfolio <span aria-hidden="true">{path}</span>
          </span>
        </p>

        <p className="text-xs text-(--theme-text-muted) order-3 sm:order-2 text-center">
          © {new Date().getFullYear()} {site.name} · Built with Next.js,
          TypeScript, Tailwind CSS &amp; Framer Motion
        </p>

        <ul className="flex items-center gap-1 order-1 sm:order-3">
          {socialLinks.map(({ href, label, icon: Icon }) => {
            const isExternal = href.startsWith("http");
            return (
              <li key={label}>
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex p-2.5 rounded-(--btn-radius) text-(--theme-text-secondary) transition-colors hover:text-(--theme-text) hover:bg-(--theme-surface-elevated)"
                >
                  <Icon className="w-4 h-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
