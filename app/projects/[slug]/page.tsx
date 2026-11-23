import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { AnimatedPill } from "@/components/ui/animated-pill";
import { Button } from "@/components/ui/button";
import { ProjectStatus } from "@/components/ui/project-status";
import { projects } from "@/lib/data";

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
      rehypePlugins: [rehypeHighlight],
    },
  };

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <article className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm mb-10 text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Projects
        </Link>

        <header className="mb-12 pb-10 border-b border-(--theme-border)">
          <h1 className="text-display text-(--theme-text) mb-5">
            {project.title}
          </h1>
          <p className="text-lead max-w-2xl text-(--theme-text-secondary)">
            {project.description}
          </p>

          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 max-w-xl">
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

          <ul
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Technologies used"
          >
            {project.tech.map((t, i) => (
              <li key={t}>
                <AnimatedPill label={t} delay={i * 0.04} />
              </li>
            ))}
          </ul>
        </header>

        <div className="case-study">
          <MDXRemote source={source} options={mdxOptions} />
        </div>

        {(project.github || project.demo) && (
          <div className="mt-14 flex flex-wrap gap-3">
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

        <nav
          aria-label="More projects"
          className="mt-14 pt-8 border-t border-(--theme-border) grid grid-cols-3 items-center gap-4 text-sm"
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
            className="justify-self-center text-(--theme-text-secondary) transition-colors hover:text-(--theme-text)"
          >
            All Projects
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
      </div>
    </article>
  );
}
