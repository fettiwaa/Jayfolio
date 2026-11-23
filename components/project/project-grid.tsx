"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/project/project-card";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

interface ProjectGridProps {
  featuredOnly?: boolean;
  limit?: number;
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// The parent section supplies the container width and side padding.
export default function ProjectGrid({
  featuredOnly = false,
  limit,
}: ProjectGridProps) {
  const displayProjects: Project[] = featuredOnly
    ? projects.filter((p) => p.featured)
    : projects;

  const visibleProjects = limit
    ? displayProjects.slice(0, limit)
    : displayProjects;

  if (visibleProjects.length === 0) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="grid md:grid-cols-2 gap-6 md:gap-8"
    >
      {visibleProjects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </motion.div>
  );
}
