import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectStatus } from "@/components/ui/project-status";
import { Panel, PanelGrid } from "@/components/ui/panel";
import { TechLogo } from "@/components/ui/tech-tile";
import { projects } from "@/lib/data";
import { rehypeSections, slugifyHeading } from "@/lib/rehype-sections";

const projectsDir = path.join(process.cwd(), "content", "projects");

function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

function getAdjacentProjects(slug: string) {
  const featured = projects.filter((p) => p.featured);
  const index = featured.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? featured[index - 1] : null;
  const next = index < featured.length - 1 ? featured[index + 1] : null;
  return { prev, next };
}

/** "## Heading" lines outside code blocks, for the contents list. */
function getSectionHeadings(source: string) {
  const withoutCode = source.replace(/```[\s\S]*?```/g, "");
  return Array.from(withoutCode.matchAll(/^## (.+)$/gm), (match) => {
    const text = match[1].trim();
    return { text, id: slugifyHeading(text) };
  });
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const filePath = path.join(projectsDir, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");
  // The RSC MDXRemote compiles the raw MDX string itself; passing a
  // serialize() result here renders an empty body.
  const mdxOptions = {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      // rehypeSections wraps each "##" section in its own panel.
      rehypePlugins: [rehypeHighlight, rehypeSections],
    },
  };

  const { prev, next } = getAdjacentProjects(slug);
  const sections = getSectionHeadings(source);

  return (
    <div className="max-width-content mx-auto section-padding-x section-padding">
      <PanelGrid className="lg:grid-cols-12 items-start">
        <Panel as="div" flush className="lg:col-span-12">
          <nav aria-label="Breadcrumb" className="panel-header">
            <ol className="flex items-center gap-1.5 text-label text-(--theme-text-muted) min-w-0">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-(--theme-text)"
                >
                  jayfolio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-(--theme-text)"
                >
                  projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-(--theme-text) truncate">
                {project.slug}
              </li>
            </ol>
            <span className="text-label text-(--theme-text-muted) shrink-0">
              {project.year}
            </span>
          </nav>
          <div className="panel-body">
            <h1 className="text-display text-(--theme-text)">
              {project.title}
            </h1>
            <p className="text-lead mt-3 max-w-2xl text-(--theme-text-secondary)">
              {project.description}
            </p>
            {(project.github || project.demo) && (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.github && (
                  <Button
                    href={project.github}
                    variant="secondary"
                    icon={<ArrowUpRight size={16} />}
                  >
                    GitHub Repository
                  </Button>
                )}
                {project.demo && (
                  <Button
                    href={project.demo}
                    variant="secondary"
                    icon={<ArrowUpRight size={16} />}
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            )}
          </div>
        </Panel>

        {/* Side column: facts first on phones, sticky beside the write-up on desktop. */}
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:sticky lg:top-20 min-w-0 grid grid-cols-1 gap-4">
          <Panel title="Project" headingLevel={2}>
            <dl className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              <div>
                <dt className="text-label text-(--theme-text-muted)">Year</dt>
                <dd className="mt-1 text-sm text-(--theme-text)">
                  {project.year}
                </dd>
              </div>
              <div>
                <dt className="text-label text-(--theme-text-muted)">Status</dt>
                <dd className="mt-1 text-sm text-(--theme-text)">
                  <ProjectStatus status={project.status} />
                </dd>
              </div>
              <div>
                <dt className="text-label text-(--theme-text-muted)">Role</dt>
                <dd className="mt-1 text-sm text-(--theme-text)">
                  {project.role}
                </dd>
              </div>
            </dl>
            <h3 className="mt-5 mb-2 text-label text-(--theme-text-muted)">
              Stack
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-(--badge-radius) border border-(--theme-border) bg-(--theme-surface-elevated) text-xs font-mono text-(--theme-text-secondary)"
                >
                  <TechLogo name={t} size={12} />
                  {t}
                </li>
              ))}
            </ul>
          </Panel>

          {sections.length > 1 && (
            <Panel
              title="Contents"
              meta={`${sections.length} sections`}
              className="hidden lg:flex"
            >
              <nav aria-label="Case study sections">
                <ol className="space-y-1.5 text-sm">
                  {sections.map((section, i) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex gap-3 text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)"
                      >
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-(--theme-text-muted) pt-0.5"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {section.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </Panel>
          )}
        </div>

        <div className="case-study min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-2 [&_.cs-section]:scroll-mt-20">
          <MDXRemote source={source} options={mdxOptions} />
        </div>

        <Panel as="div" flush className="lg:col-span-12">
          <nav
            aria-label="More projects"
            className="grid grid-cols-3 items-center gap-4 px-5 py-4 text-sm"
          >
            <div>
              {prev && (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="inline-flex items-center gap-2 text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>
                    <span className="sr-only">Previous project: </span>
                    {prev.title}
                  </span>
                </Link>
              )}
            </div>
            <Link
              href="/projects"
              className="justify-self-center text-label text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)"
            >
              All projects
            </Link>
            <div className="justify-self-end">
              {next && (
                <Link
                  href={`/projects/${next.slug}`}
                  className="inline-flex items-center gap-2 text-right text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)"
                >
                  <span>
                    <span className="sr-only">Next project: </span>
                    {next.title}
                  </span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              )}
            </div>
          </nav>
        </Panel>
      </PanelGrid>
    </div>
  );
}
