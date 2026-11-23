import Link from "next/link";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import HeroPanels from "@/components/sections/hero";
import AboutPanel from "@/components/sections/about";
import TechStackPanel from "@/components/sections/skills";
import ProjectGrid from "@/components/project/project-grid";
import { Panel, PanelGrid } from "@/components/ui/panel";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceEmpty } from "@/components/ui/experience-empty";
import { Button } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { experiences, educationData, projects } from "@/lib/data";
import { emailComposeUrl, site } from "@/lib/constants";

const experienceItems = experiences.map((exp) => ({
  period: exp.period,
  title: exp.title,
  subtitle: exp.company,
  location: exp.location,
  tags: ["Laravel", "PHP", "Git"],
  details: exp.responsibilities.map((r) => ({
    type: "text" as const,
    content: r,
  })),
}));

const educationItems = educationData.map((edu) => ({
  period: edu.period,
  title: edu.degree,
  subtitle: edu.school,
  location: edu.location,
  details: [
    { type: "text" as const, content: "Expected Graduation: 2027" },
    ...(edu.awards?.map((a) => ({ type: "text" as const, content: a })) ?? []),
  ],
}));

const channels = [
  {
    label: "Email",
    value: site.email,
    href: emailComposeUrl,
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

const panelLinkClasses =
  "inline-flex items-center gap-1 normal-case tracking-normal font-sans text-xs text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)";

// Section ids (about, projects, experience, skills, education, contact) give each
// panel a linkable anchor, e.g. /#projects.
export default function Home() {
  return (
    <div className="max-width-content mx-auto section-padding-x pt-6 pb-16 md:pt-8 md:pb-20">
      <PanelGrid className="lg:grid-cols-12">
        <HeroPanels />

        {/* Phones read About + Tech Stack first; on desktop each column is pinned to
            its place in row 3 (row 1: hero + portrait, row 2: core-stack strip). */}
        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-3 min-w-0 grid grid-cols-1 gap-4 content-start">
          <AboutPanel />
          <TechStackPanel />
        </div>

        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-3 min-w-0 grid grid-cols-1 gap-4 content-start">
          <Panel
            id="experience"
            title="Experience"
            meta={
              experienceItems.length > 0 ? (
                <Link href="/experience" className={panelLinkClasses}>
                  View all <ArrowRight size={12} aria-hidden="true" />
                </Link>
              ) : (
                `${experienceItems.length} entries`
              )
            }
          >
            <Timeline
              items={experienceItems}
              emptyState={<ExperienceEmpty />}
            />
          </Panel>

          <Panel
            id="education"
            title="Education"
            meta={
              <Link href="/education" className={panelLinkClasses}>
                Details <ArrowRight size={12} aria-hidden="true" />
              </Link>
            }
          >
            <Timeline items={educationItems} />
          </Panel>
        </div>

        <Panel
          id="projects"
          title="Selected Work"
          meta={
            <Link href="/projects" className={panelLinkClasses}>
              All {projects.length} projects{" "}
              <ArrowRight size={12} aria-hidden="true" />
            </Link>
          }
          className="lg:col-span-12"
          bodyClassName="bg-(--theme-bg)/40"
        >
          <ProjectGrid featuredOnly limit={4} />
        </Panel>

        <Panel
          id="contact"
          title="Contact"
          meta="say hello"
          className="lg:col-span-12"
        >
          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div>
              <h3 className="text-section text-(--theme-text)">
                Let&apos;s Build Something Together
              </h3>
              <p className="text-lead mt-3 text-(--theme-text-secondary)">
                I&apos;m always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
              </p>
              <div className="mt-5">
                <Button
                  href="/contact"
                  variant="primary"
                  icon={<ArrowRight size={16} />}
                >
                  Get in Touch
                </Button>
              </div>
            </div>
            <ul className="grid gap-2">
              {channels.map(({ label, value, href, icon: Icon }) => {
                const isExternal = href.startsWith("http");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="panel-inset group flex items-center gap-3 px-4 py-3 transition-colors hover:border-(--theme-border-strong)"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-(--theme-text-secondary)" />
                      <span className="hidden sm:inline text-label text-(--theme-text-muted) w-16 shrink-0">
                        {label}
                      </span>
                      <span className="text-sm text-(--theme-text) truncate">
                        {value}
                      </span>
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="ml-auto shrink-0 text-(--theme-text-muted) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Panel>
      </PanelGrid>
    </div>
  );
}
