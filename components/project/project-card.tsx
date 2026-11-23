"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectStatus } from "@/components/ui/project-status";
import { TechLogo } from "@/components/ui/tech-tile";
import { hoverLift, panelItem } from "@/lib/animations";
import type { Project } from "@/lib/types";

const actionClasses =
  "inline-flex items-center gap-1 text-xs font-mono px-3 py-2 min-h-9 rounded-(--btn-radius) border border-(--theme-border) text-(--theme-text-secondary) transition-colors hover:text-(--theme-text) hover:border-(--theme-border-strong)";

interface ProjectCardProps extends Project {
  /** Position in the list, shown as 01, 02, … */
  index: number;
  /** h2 on the Projects page, h3 under the home page's "Selected Work" panel. */
  headingLevel?: 2 | 3;
}

export default function ProjectCard({
  index,
  headingLevel = 3,
  title,
  description,
  tech,
  year,
  status,
  role,
  thumbnail,
  href,
  github,
  demo,
}: ProjectCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <motion.article
      variants={panelItem}
      whileHover={hoverLift}
      className="panel panel-interactive group flex flex-col min-w-0"
    >
      <div className="panel-header">
        <span className="text-label text-(--theme-text-muted)">
          {String(index + 1).padStart(2, "0")}
          <span aria-hidden="true"> · </span>
          {year}
        </span>
        <span className="text-label text-(--theme-text-secondary)">
          <ProjectStatus status={status} />
        </span>
      </div>

      {/* One main link: thumbnail, title and summary open the case study. */}
      <Link href={href} className="block p-2 pb-0 rounded-(--panel-radius)">
        <div className="relative overflow-hidden aspect-video rounded-[calc(var(--panel-radius)-2px)] border border-(--theme-border) bg-(--theme-surface-elevated)">
          {thumbnail ? (
            // Decorative: the title below names the project.
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-cover grayscale opacity-85 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
            />
          ) : (
            <span
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-(--theme-text-muted)"
            >
              {title.charAt(0)}
            </span>
          )}
        </div>
        <div className="px-3 sm:px-4 pt-4">
          <Heading className="text-section text-(--theme-text) underline-offset-4 decoration-(--theme-border-strong) group-hover:underline">
            {title}
          </Heading>
          <p className="mt-2 text-sm leading-relaxed text-(--theme-text-secondary)">
            {description}
          </p>
        </div>
      </Link>

      <div className="px-5 sm:px-6 pb-5 pt-4 flex flex-col gap-4 flex-1">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {tech.map((t) => (
            <li
              key={t}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-(--badge-radius) border border-(--theme-border) text-xs font-mono text-(--theme-text-secondary)"
            >
              <TechLogo name={t} size={12} />
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-(--theme-border)">
          <span className="text-label text-(--theme-text-muted)">{role}</span>
          <div className="flex flex-wrap gap-2">
            <Link href={href} className={actionClasses}>
              Case Study
              <span className="sr-only">: {title}</span>
            </Link>
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClasses}
              >
                GitHub
                <span className="sr-only">
                  {" "}
                  repository for {title} (opens in a new tab)
                </span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className={actionClasses}
              >
                Live Demo
                <span className="sr-only">
                  {" "}
                  of {title} (opens in a new tab)
                </span>
                <ArrowUpRight size={12} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
