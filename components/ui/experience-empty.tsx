import Link from "next/link";

/** Owner-approved empty state for Experience (2026-11-23, decision D4). */
export function ExperienceEmpty() {
  return (
    <p className="text-sm leading-relaxed text-(--theme-text-secondary) max-w-xl">
      Nothing listed yet. I&apos;m focused on my studies and my own projects for
      now. Take a look at{" "}
      <Link
        href="/projects"
        className="text-(--theme-text) underline underline-offset-4 decoration-(--theme-border) hover:decoration-(--theme-text)"
      >
        Projects
      </Link>
      .
    </p>
  );
}
