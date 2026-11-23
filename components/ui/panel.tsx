"use client";

import { useId, type ReactNode } from "react";
import { motion } from "framer-motion";
import { panelContainer, panelItem } from "@/lib/animations";

interface PanelProps {
  /** Shown in the header strip as "~/ title"; also the panel's accessible name. */
  title?: string;
  /** Heading level for the title. Inner pages use 2; nested panels use 3. */
  headingLevel?: 2 | 3;
  /** Right side of the header strip (dates, counts, a link). */
  meta?: ReactNode;
  id?: string;
  as?: "section" | "article" | "div";
  className?: string;
  bodyClassName?: string;
  /** Skip the default body padding (for edge-to-edge content like images). */
  flush?: boolean;
  /** Border brightens and shadow deepens on hover/focus. */
  interactive?: boolean;
  children: ReactNode;
}

const MOTION_TAGS = {
  section: motion.section,
  article: motion.article,
  div: motion.div,
};

/** The site's panel: section container with an optional mono header strip. */
export function Panel({
  title,
  headingLevel = 2,
  meta,
  id,
  as = "section",
  className = "",
  bodyClassName = "",
  flush = false,
  interactive = false,
  children,
}: PanelProps) {
  const headingId = useId();
  const Tag = MOTION_TAGS[as];
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <Tag
      id={id}
      variants={panelItem}
      aria-labelledby={title ? headingId : undefined}
      className={`panel ${interactive ? "panel-interactive" : ""} flex flex-col min-w-0 ${className}`}
    >
      {title && (
        <div className="panel-header">
          <Heading
            id={headingId}
            className="text-label font-semibold text-(--theme-text)"
          >
            <span aria-hidden="true" className="text-(--theme-text-muted)">
              ~/{" "}
            </span>
            {title}
          </Heading>
          {meta && (
            <div className="text-label text-(--theme-text-muted) shrink-0">
              {meta}
            </div>
          )}
        </div>
      )}
      <div className={`${flush ? "" : "panel-body"} flex-1 ${bodyClassName}`}>
        {children}
      </div>
    </Tag>
  );
}

interface PanelGridProps {
  className?: string;
  children: ReactNode;
}

/** Grid that reveals its panels once, in order, when the page loads. */
export function PanelGrid({ className = "", children }: PanelGridProps) {
  return (
    <motion.div
      variants={panelContainer}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 gap-4 ${className}`}
    >
      {children}
    </motion.div>
  );
}
