"use client";

import { Panel } from "@/components/ui/panel";
import { TechTile } from "@/components/ui/tech-tile";
import { skillCategories } from "@/lib/data";

const uniqueCount = new Set(skillCategories.flatMap((c) => c.items)).size;

interface TechStackPanelProps {
  id?: string;
  className?: string;
}

/** Technical inventory: every technology from lib/data.ts as a logo tile, grouped by category. */
export default function TechStackPanel({
  id = "skills",
  className = "",
}: TechStackPanelProps) {
  return (
    <Panel
      id={id}
      title="Tech Stack"
      meta={`${uniqueCount} tools`}
      className={className}
    >
      {/* Container queries: columns follow the panel's width, not the window's. */}
      <div className="@container space-y-6">
        {skillCategories.map((category) => {
          const labelId = `stack-${category.label.toLowerCase()}`;
          return (
            <section key={category.label} aria-labelledby={labelId}>
              <div className="flex items-center gap-3 mb-3">
                <h3
                  id={labelId}
                  className="text-label font-semibold text-(--theme-text)"
                >
                  {category.label}
                </h3>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-(--theme-border)"
                />
                <span className="text-label text-(--theme-text-muted)">
                  {String(category.items.length).padStart(2, "0")}
                </span>
              </div>
              <ul className="grid grid-cols-3 @xs:grid-cols-4 @md:grid-cols-5 @xl:grid-cols-6 @4xl:grid-cols-8 gap-2">
                {category.items.map((item) => (
                  <TechTile key={item} name={item} />
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Panel>
  );
}
