"use client";

import { motion, type Variants } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { site } from "@/lib/constants";
import { projects, skillCategories } from "@/lib/data";
import { staggerContainerHero } from "@/lib/animations";
import { Button } from "@/components/ui/button";

// Only list photos that exist in public/images. With one photo the carousel is off;
// add files here (e.g. "/images/profile-2.jpg") to turn it back on.
const profileImages = ["/images/profile.jpg"];
const hasCarousel = profileImages.length > 1;

// Counted from lib/data.ts so the stats stay accurate as content changes.
const formatCount = (count: number) => String(count).padStart(2, "0");
// Unique, because some skills (e.g. PostgreSQL) appear in more than one category.
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

const heroItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HeroSection() {
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
    <motion.div
      key={imgIndex}
      initial={hasCarousel ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-(--card-radius) overflow-hidden border border-(--theme-border)"
    >
      <img
        src={profileImages[imgIndex]}
        alt="Portrait of Jaycee Andal"
        className="w-full h-full object-cover grayscale opacity-90 transition duration-500 group-hover:grayscale-0 group-hover:opacity-100"
        loading="eager"
      />
    </motion.div>
  );

  return (
    <section id="hero" className="min-h-[75vh] flex items-center py-12">
      <div className="max-width-content mx-auto section-padding-x w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            variants={staggerContainerHero}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={heroItem}
              className="text-label text-(--theme-text-muted) mb-6"
            >
              {site.title}
            </motion.p>

            <motion.h1
              variants={heroItem}
              className="text-display text-(--theme-text) mb-6"
            >
              {site.name}
            </motion.h1>

            <motion.p
              variants={heroItem}
              className="text-lead max-w-md mb-8 text-(--theme-text-secondary)"
            >
              {site.description}
            </motion.p>

            <motion.div variants={heroItem} className="mb-12">
              <Button href="/projects" variant="primary" size="md">
                View Projects
              </Button>
            </motion.div>

            <motion.dl
              variants={heroItem}
              className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5 max-w-sm"
            >
              {playerStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-label text-(--theme-text-muted)">
                    {stat.label}
                  </dt>
                  <dd className="mt-1 font-mono text-sm font-semibold uppercase text-(--theme-text)">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          <motion.div
            variants={heroItem}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            {hasCarousel ? (
              <button
                type="button"
                onClick={nextImage}
                className="group rounded-(--card-radius)"
                aria-label="Show next photo"
              >
                {photo}
              </button>
            ) : (
              <div className="group">{photo}</div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
