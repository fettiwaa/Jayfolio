"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  /** Use "h1" when the title is the page's main heading (inner pages). */
  as?: "h1" | "h2";
}

export function SectionTitle({
  title,
  subtitle,
  as: Heading = "h2",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-10 md:mb-14"
    >
      <Heading
        className={`${Heading === "h1" ? "text-page-title" : "text-section"} text-(--theme-text)`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className="text-lead mt-3 max-w-2xl text-(--theme-text-secondary)">
          {subtitle}
        </p>
      )}
      <div className="mt-6 md:mt-8 border-t border-(--theme-border)" />
    </motion.div>
  );
}
