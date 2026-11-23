"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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

export function Timeline({ items, emptyState }: TimelineProps) {
  if (items.length === 0) {
    return (
      <div className="text-sm text-(--theme-text-secondary)">
        {emptyState ?? <p>Nothing to show here yet. Check back soon.</p>}
      </div>
    );
  }

  return (
    // One line on the left at every width; each dot is centred on it.
    <ol className="relative border-l border-(--theme-border) ml-1.5">
      {items.map((item, index) => (
        <motion.li
          key={item.title + item.period}
          className="relative pl-8 md:pl-10 pb-12 last:pb-0"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-(--theme-text-muted) ring-4 ring-(--theme-bg)"
          />
          <time className="text-label text-(--theme-text-muted)">
            {item.period}
          </time>
          <h3 className="text-subsection text-(--theme-text) mt-2">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-base mt-1 text-(--theme-text-secondary)">
              {item.subtitle}
            </p>
          )}
          {item.location && (
            <p className="text-sm mt-0.5 text-(--theme-text-muted)">
              {item.location}
            </p>
          )}
          {item.tags && item.tags.length > 0 && (
            <ul
              className="flex flex-wrap gap-1.5 mt-3"
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
            <ul className="mt-4 space-y-1.5 max-w-2xl">
              {item.details.map((detail) => (
                <li
                  key={detail.content}
                  className="text-sm leading-relaxed text-(--theme-text-secondary)"
                >
                  {detail.content}
                </li>
              ))}
            </ul>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
