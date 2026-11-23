import { ArrowUpRight, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Panel, PanelGrid } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { site } from "@/lib/constants";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/fettiwaa",
    href: site.github,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/jaycee-andal",
    href: site.linkedin,
    icon: LinkedInIcon,
  },
];

export default function ContactPage() {
  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid className="lg:grid-cols-12 items-start">
        <div className="lg:col-span-12">
          <PageHeader
            path="contact"
            title="Get in Touch"
            subtitle="Let's build something together."
          />
        </div>

        <Panel
          title="Channels"
          meta={`${channels.length} links`}
          className="lg:col-span-7"
        >
          <ul className="grid gap-2">
            {channels.map(({ label, value, href, icon: Icon }) => {
              const isExternal = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="panel-inset group flex items-center gap-4 px-4 py-3.5 transition-colors hover:border-(--theme-border-strong)"
                  >
                    <span className="w-9 h-9 shrink-0 rounded-(--btn-radius) flex items-center justify-center border border-(--theme-border) bg-(--theme-surface) text-(--theme-text)">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-label text-(--theme-text-muted)">
                        {label}
                      </span>
                      <span className="block text-sm text-(--theme-text) break-all">
                        {value}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="ml-auto shrink-0 text-(--theme-text-muted) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="mt-5 text-sm leading-relaxed text-(--theme-text-secondary)">
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Feel free to reach out via
            email or through any of the channels above.
          </p>
        </Panel>

        <Panel title="Email" meta="fastest" className="lg:col-span-5">
          <h3 className="text-subsection text-(--theme-text)">
            Send me an email
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-(--theme-text-secondary)">
            The quickest way to reach me is by email at{" "}
            <span className="text-(--theme-text) break-all">{site.email}</span>.
            I usually reply within a couple of days.
          </p>
          <div className="mt-5">
            <Button
              href={`mailto:${site.email}`}
              variant="primary"
              className="w-full"
              icon={<Mail size={16} />}
            >
              Email me
            </Button>
          </div>
        </Panel>
      </PanelGrid>
    </div>
  );
}
