"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { staggerFade, fadeInUp } from "@/lib/animations";
import { SectionTitle } from "@/components/ui/section-title";

const focusAreas = [
  "Full Stack Development",
  "Laravel",
  "System Design",
  "UI/UX",
];

interface AboutSectionProps {
  /** True on the /about page, where the title is the page's main heading. */
  isPage?: boolean;
}

export default function AboutSection({ isPage = false }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={isPage ? "section-padding" : "section-padding-sm"}
    >
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          as={isPage ? "h1" : "h2"}
          title="About"
          subtitle="I build clean, scalable software that solves real-world problems."
        />

        <motion.div
          variants={staggerFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="text-lead max-w-2xl mx-auto mb-8 text-(--theme-text-secondary)"
          >
            BS Computer Science student at Batangas State University. Building
            software that solves real-world problems.
          </motion.p>

          {/* Wraps as one line of text; separators are decorative. */}
          <motion.ul
            variants={fadeInUp}
            aria-label="Focus areas"
            className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm text-(--theme-text-secondary)"
          >
            {focusAreas.map((area, i) => (
              <Fragment key={area}>
                {i > 0 && (
                  <li aria-hidden="true" className="text-(--theme-text-muted)">
                    ·
                  </li>
                )}
                <li>{area}</li>
              </Fragment>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
