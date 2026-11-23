"use client";

import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { site } from "@/lib/constants";
import { projects, skillCategories } from "@/lib/data";
import { panelItem, EASE_OUT } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { TechLogo } from "@/components/ui/tech-tile";

// Only list photos that exist in public/images. With one photo the carousel is off;
// add files here (e.g. "/images/profile-2.jpg") to turn it back on.
const profileImages = ["/images/profile.jpg"];
const hasCarousel = profileImages.length > 1;

// Counted from lib/data.ts so the stats stay accurate as content changes.
const formatCount = (count: number) => String(count).padStart(2, "0");
const techCount = new Set(skillCategories.flatMap((category) => category.items))
  .size;

const playerStats = [
  { label: "Level", value: "03" },
  { label: "Role", value: "Full Stack" },
  { label: "XP", value: "80%" },
  { label: "Projects", value: formatCount(projects.length) },
  { label: "Tech", value: formatCount(techCount) },
  { label: "Coffee", value: "∞" },
];

// A short strip of the stack, all taken from the skills data.
const coreStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Tailwind CSS",
  "Node.js",
  "Laravel",
  "PostgreSQL",
];

// One full loop of the core-stack strip; slow enough to read the names.
const marqueeStyle: CSSProperties & Record<"--marquee-duration", string> = {
  "--marquee-duration": "32s",
};

/** Hero intro panel, portrait panel and core-stack strip. Place inside a 12-column PanelGrid. */
export default function HeroPanels() {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (!hasCarousel) return;
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % profileImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = useCallback(() => {
    setImgIndex((prev) => (prev + 1) % profileImages.length);
  }, []);

  const photo = (
    <motion.img
      key={imgIndex}
      src={profileImages[imgIndex]}
      alt="Portrait of Jaycee Andal"
      initial={hasCarousel ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="w-full h-full object-cover object-[50%_38%] grayscale contrast-[1.05] transition-[filter] duration-500 group-hover:grayscale-0"
      loading="eager"
    />
  );

  return (
    <>
      <motion.section
        id="hero"
        variants={panelItem}
        aria-labelledby="hero-name"
        className="panel lg:col-span-8 flex flex-col"
      >
        <div className="panel-header">
          <p className="text-label text-(--theme-text-muted)">
            <span aria-hidden="true">~/ </span>
            {site.title}
          </p>
          <p className="text-label text-(--theme-text-muted) hidden sm:block">
            BS Computer Science
          </p>
        </div>
        <div className="panel-body flex-1 flex flex-col gap-6 sm:gap-8">
          <div>
            <h1 id="hero-name" className="text-display text-(--theme-text)">
              {site.name}
            </h1>
            <p className="text-lead mt-4 max-w-md text-(--theme-text-secondary)">
              {site.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href="/projects"
                variant="primary"
                icon={<ArrowRight size={16} />}
              >
                View Projects
              </Button>
              <Button
                href={`mailto:${site.email}`}
                variant="secondary"
                icon={<Mail size={16} />}
              >
                Email me
              </Button>
            </div>
          </div>

          {/* 1px gaps over a border-coloured background draw the hairline grid. */}
          <dl className="mt-auto grid grid-cols-2 sm:grid-cols-3 gap-px overflow-hidden rounded-[calc(var(--panel-radius)-2px)] border border-(--theme-border) bg-(--theme-border)">
            {playerStats.map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-3 bg-(--theme-surface-elevated)"
              >
                <dt className="text-label text-(--theme-text-muted)">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-mono text-sm font-semibold uppercase text-(--theme-text)">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.section>

      <Panel
        title="profile.jpg"
        className="lg:col-span-4"
        flush
        bodyClassName="p-2"
      >
        {hasCarousel ? (
          <button
            type="button"
            onClick={nextImage}
            className="group block w-full h-full min-h-72 overflow-hidden rounded-[calc(var(--panel-radius)-2px)]"
            aria-label="Show next photo"
          >
            {photo}
          </button>
        ) : (
          <div className="group w-full h-full aspect-4/3 sm:aspect-square lg:aspect-auto overflow-hidden rounded-[calc(var(--panel-radius)-2px)] border border-(--theme-border)">
            {photo}
          </div>
        )}
      </Panel>

      <motion.div
        variants={panelItem}
        className="panel lg:col-span-12 min-w-0 overflow-hidden flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4"
      >
        <p className="text-label text-(--theme-text-muted) shrink-0">
          <span aria-hidden="true">~/ </span>core stack
        </p>
        {/* Scrolls continuously; pauses on hover or keyboard focus; still under reduce-motion. */}
        <div className="marquee flex-1 min-w-0 text-(--theme-text-secondary)">
          <div className="marquee-track" style={marqueeStyle}>
            {/* Two identical copies make the loop seamless; the second is hidden from screen readers. */}
            {[false, true].map((isCopy) => (
              <ul
                key={String(isCopy)}
                aria-label={isCopy ? undefined : "Core stack"}
                aria-hidden={isCopy || undefined}
                className="flex items-center shrink-0"
              >
                {coreStack.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 pr-10 transition-colors hover:text-(--theme-text)"
                  >
                    <TechLogo name={name} size={20} />
                    <span className="text-xs font-mono whitespace-nowrap">
                      {name}
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}
