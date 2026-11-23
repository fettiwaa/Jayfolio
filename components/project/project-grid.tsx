"use client";

import ProjectCard from "@/components/project/project-card";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

interface ProjectGridProps {
  featuredOnly?: boolean;
  limit?: number;
  className?: string;
  /** Heading level for card titles; 2 when the grid sits directly under a page h1. */
  headingLevel?: 2 | 3;
}

/**
 * Project panels in a two-column grid. Rendered inside a PanelGrid, which
 * reveals the cards (their variants inherit from it).
 */
export default function ProjectGrid({
  featuredOnly = false,
  limit,
  className = "",
  headingLevel = 3,
}: ProjectGridProps) {
  const displayProjects: Project[] = featuredOnly
    ? projects.filter((p) => p.featured)
    : projects;

  const visibleProjects = limit
    ? displayProjects.slice(0, limit)
    : displayProjects;

  if (visibleProjects.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {visibleProjects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          index={index}
          headingLevel={headingLevel}
          {...project}
        />
      ))}
    </div>
  );
}
