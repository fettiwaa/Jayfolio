"use client";

import { Panel } from "@/components/ui/panel";
import { educationData } from "@/lib/data";
import { site } from "@/lib/constants";

const focusAreas = [
  "Full Stack Development",
  "Laravel",
  "System Design",
  "UI/UX",
];

// Facts drawn only from existing data (education entry and site settings).
const currentStudy = educationData[0];
const facts = currentStudy
  ? [
      { label: "Study", value: "BS Computer Science" },
      { label: "School", value: currentStudy.school },
      { label: "Years", value: currentStudy.period },
      { label: "Role", value: site.title },
    ]
  : [{ label: "Role", value: site.title }];

interface AboutPanelProps {
  id?: string;
  title?: string;
  className?: string;
}

/** About panel: short bio, focus areas and key facts. */
export default function AboutPanel({
  id = "about",
  title = "About",
  className = "",
}: AboutPanelProps) {
  return (
    <Panel id={id} title={title} meta="whoami" className={className}>
      <p className="text-lead text-(--theme-text-secondary)">
        BS Computer Science student at Batangas State University. Building
        software that solves real-world problems.
      </p>

      <ul aria-label="Focus areas" className="mt-4 flex flex-wrap gap-1.5">
        {focusAreas.map((area) => (
          <li
            key={area}
            className="px-2.5 py-1 rounded-(--badge-radius) border border-(--theme-border) text-xs font-mono text-(--theme-text-secondary)"
          >
            {area}
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[calc(var(--panel-radius)-2px)] border border-(--theme-border) bg-(--theme-border)">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="px-3.5 py-2.5 bg-(--theme-surface-elevated) min-w-0"
          >
            <dt className="text-label text-(--theme-text-muted)">
              {fact.label}
            </dt>
            <dd
              className="mt-0.5 text-sm text-(--theme-text) truncate"
              title={fact.value}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}
