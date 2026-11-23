"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectGrid from "@/components/project/project-grid";
import { Timeline } from "@/components/ui/timeline";
import { ExperienceEmpty } from "@/components/ui/experience-empty";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { experiences, educationData } from "@/lib/data";
import { site } from "@/lib/constants";
import { fadeInUp } from "@/lib/animations";

const linkClasses =
  "text-(--theme-text-secondary) underline-offset-4 transition-colors hover:text-(--theme-text) hover:underline";

export default function Home() {
  const experienceItems = experiences.map((exp) => ({
    period: exp.period,
    title: exp.title,
    subtitle: exp.company,
    location: exp.location,
    tags: ["Laravel", "PHP", "Git"],
    details: exp.responsibilities.map((r) => ({
      type: "text" as const,
      content: r,
    })),
  }));

  const educationItems = educationData.map((edu) => ({
    period: edu.period,
    title: edu.degree,
    subtitle: edu.school,
    location: edu.location,
    details: [
      { type: "text" as const, content: "Expected Graduation: 2027" },
      ...(edu.awards?.map((a) => ({
        type: "text" as const,
        content: `Award: ${a}`,
      })) || []),
    ],
  }));

  return (
    <>
      <HeroSection />

      <AboutSection />

      {/* Section ids match the nav links so the nav can highlight the current section. */}
      <section id="projects" className="section-padding">
        <div className="max-width-content mx-auto section-padding-x">
          <SectionTitle
            title="Selected Work"
            subtitle="Things I've designed and built, from this portfolio to tooling for AI coding agents."
          />
          <ProjectGrid featuredOnly limit={4} />
          <div className="mt-10">
            <Button
              href="/projects"
              variant="secondary"
              icon={<ArrowUpRight size={16} />}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      <section id="experience" className="section-padding-sm">
        <div className="max-width-content mx-auto section-padding-x">
          <SectionTitle
            title="Experience"
            subtitle="My professional journey in software engineering."
          />
          <Timeline items={experienceItems} emptyState={<ExperienceEmpty />} />
          {experienceItems.length > 0 && (
            <div className="mt-10">
              <Button
                href="/experience"
                variant="secondary"
                icon={<ArrowUpRight size={16} />}
              >
                View Full Experience
              </Button>
            </div>
          )}
        </div>
      </section>

      <SkillsSection />

      <section id="education" className="section-padding-sm">
        <div className="max-width-content mx-auto section-padding-x">
          <SectionTitle
            title="Education"
            subtitle="My academic background and relevant coursework."
          />
          <Timeline items={educationItems} />
        </div>
      </section>

      <section
        id="contact"
        className="section-padding border-t border-(--theme-border) mt-12 md:mt-16"
      >
        <div className="max-width-content mx-auto section-padding-x">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-section text-(--theme-text) mb-4">
              Let&apos;s Build Something Together
            </h2>
            <p className="text-lead mb-8 text-(--theme-text-secondary)">
              I&apos;m always open to discussing new projects, creative ideas,
              or opportunities to be part of your vision.
            </p>
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <li>
                <a href={`mailto:${site.email}`} className={linkClasses}>
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
    </>
  );
}
