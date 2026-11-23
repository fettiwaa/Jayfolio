import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Owner-approved empty state for Experience (2026-11-23, decision D4), panel style. */
export function ExperienceEmpty() {
  return (
    <div className="panel-inset border-dashed px-4 py-5">
      {/* Decorative terminal line; the sentence below carries the meaning. */}
      <p aria-hidden="true" className="text-label text-(--theme-text-muted)">
        $ ls experience/ → 0 entries
      </p>
      <p className="mt-3 text-sm leading-relaxed text-(--theme-text-secondary)">
        Nothing listed yet. I&apos;m focused on my studies and my own projects
        for now.
      </p>
      <Link
        href="/projects"
        className="mt-3 inline-flex items-center gap-1.5 text-sm text-(--theme-text) underline underline-offset-4 decoration-(--theme-border-strong) transition-colors hover:decoration-(--theme-text)"
      >
        Take a look at Projects
        <ArrowRight size={14} aria-hidden="true" />
      </Link>
    </div>
  );
}
