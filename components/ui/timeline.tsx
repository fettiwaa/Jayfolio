"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { DURATION, EASE_OUT } from "@/lib/animations";

interface TimelineItem {
  period: string;
  title: string;
  subtitle?: string;
  location?: string;
  details: { type: "text"; content: string }[];
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  /** Shown instead of the timeline when there are no items. */
  emptyState?: ReactNode;
}

/** Compact timeline for panels: dot on the line, title left, mono date right. */
export function Timeline({ items, emptyState }: TimelineProps) {
  if (items.length === 0) {
    return (
      <>
        {emptyState ?? (
          <p className="text-sm text-(--theme-text-secondary)">
            Nothing to show here yet.
          </p>
        )}
      </>
    );
  }

  return (
    <div className="relative">
      {/* The line draws itself once when the timeline first appears. */}
      <motion.span
        aria-hidden="true"
        className="absolute left-[5px] top-2 bottom-2 w-px bg-(--theme-border-strong) origin-top"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
      />
      <ol className="space-y-6">
        {items.map((item, index) => (
          <motion.li
            key={item.title + item.period}
            className="relative pl-7"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: DURATION.slow,
              delay: 0.15 + index * 0.08,
              ease: EASE_OUT,
            }}
          >
            {/* First entry is filled (most recent); earlier ones are rings. */}
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1 w-[11px] h-[11px] rounded-full border-2 border-(--theme-text-muted) ring-4 ring-(--theme-surface) ${
                index === 0 ? "bg-(--theme-text)" : "bg-(--theme-surface)"
              }`}
            />
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-subsection text-(--theme-text)">
                {item.title}
              </h3>
              <time className="text-label text-(--theme-text-muted) shrink-0">
                {item.period}
              </time>
            </div>
            {item.subtitle && (
              <p className="mt-0.5 text-sm text-(--theme-text-secondary)">
                {item.subtitle}
              </p>
            )}
            {item.location && (
              <p className="text-xs font-mono text-(--theme-text-muted)">
                {item.location}
              </p>
            )}
            {item.tags && item.tags.length > 0 && (
              <ul
                className="flex flex-wrap gap-1.5 mt-2"
                aria-label="Technologies"
              >
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Badge variant="outline">{tag}</Badge>
                  </li>
                ))}
              </ul>
            )}
            {item.details.length > 0 && (
              <ul className="mt-2 space-y-1">
                {item.details.map((detail) => (
                  <li
                    key={detail.content}
                    className="text-xs font-mono text-(--theme-text-secondary)"
                  >
                    {detail.content}
                  </li>
                ))}
              </ul>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
