import { Mail } from "lucide-react";
import { site } from "@/lib/constants";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

const techStack = ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"];

interface SocialLink {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const socialLinks: SocialLink[] = [
  { href: site.github, label: "GitHub", icon: GitHubIcon },
  { href: site.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
];

export default function Footer() {
  return (
    <footer className="border-t border-(--theme-border)">
      <div className="max-width-content mx-auto section-padding-x py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-(--theme-text-secondary)">
            Designed &amp; Developed by {site.name}
          </p>

          <ul className="flex items-center gap-2">
            {socialLinks.map(({ href, label, icon: Icon }) => {
              const isExternal = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="flex p-2.5 rounded-full text-(--theme-text-secondary) transition-colors hover:text-(--theme-text) hover:bg-(--theme-surface-elevated)"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                </li>
              );
            })}
          </ul>

          <p className="text-xs text-(--theme-text-muted)">
            Built with{" "}
            {techStack.map((tech, i) => (
              <span key={tech}>
                <span className="text-(--theme-text-secondary)">{tech}</span>
                {i < techStack.length - 1 && (
                  <span aria-hidden="true"> · </span>
                )}
              </span>
            ))}
          </p>
        </div>

        <p className="border-t border-(--theme-border) mt-8 pt-6 text-center text-xs text-(--theme-text-muted)">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
