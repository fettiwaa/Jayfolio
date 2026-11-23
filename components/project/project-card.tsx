"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/components/ui/project-status";
import type { Project } from "@/lib/types";

const actionClasses =
  "inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-(--btn-radius) border border-(--theme-border) text-(--theme-text-secondary) transition-colors hover:text-(--theme-text) hover:border-(--theme-text-muted)";

export default function ProjectCard({
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
}: Project) {
  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: "easeOut" },
        },
      }}
      className="group flex flex-col h-full rounded-(--card-radius) overflow-hidden border border-(--theme-border) bg-(--theme-surface) transition-colors hover:border-(--theme-text-muted)"
    >
      {/* One main link: the image and title open the case study. */}
      <Link href={href} className="block focus-visible:outline-offset-[-2px]">
        <div className="relative overflow-hidden aspect-[16/9] bg-(--theme-surface-elevated) border-b border-(--theme-border)">
          {thumbnail ? (
            // Decorative: the title below names the project.
            <img
              src={thumbnail}
              alt=""
              className="w-full h-full object-cover grayscale opacity-80 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span
                className="text-3xl font-bold text-(--theme-text-muted)"
                aria-hidden="true"
              >
                {title.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="px-6 pt-6">
          <h3 className="text-subsection text-(--theme-text) mb-2 underline-offset-4 decoration-(--theme-border) group-hover:underline">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-(--theme-text-secondary)">
            {description}
          </p>
        </div>
      </Link>

      <div className="px-6 pb-6 pt-4 flex flex-col gap-4 flex-1">
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {tech.slice(0, 5).map((t) => (
            <li key={t}>
              <Badge variant="outline">{t}</Badge>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-4 text-label text-(--theme-text-muted)">
          <span className="flex items-center gap-2">
            {year}
            <span aria-hidden="true">·</span>
            <ProjectStatus status={status} />
          </span>
          <span className="text-right">{role}</span>
        </div>

        <div className="mt-auto pt-4 flex flex-wrap gap-2 border-t border-(--theme-border)">
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
              <span className="sr-only"> of {title} (opens in a new tab)</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
