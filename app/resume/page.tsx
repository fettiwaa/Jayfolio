"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExperienceEmpty } from "@/components/ui/experience-empty";
import { experiences, educationData } from "@/lib/data";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function EntryHeader({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
      <h3 className="text-subsection text-(--theme-text)">{title}</h3>
      <time className="text-label text-(--theme-text-muted)">{period}</time>
    </div>
  );
}

export default function ResumePage() {
  return (
    <section className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          as="h1"
          title="Resume"
          subtitle="Explore my experience and education below."
        />

        <div className="flex flex-wrap gap-3 mb-16">
          <Button
            href="/experience"
            variant="secondary"
            icon={<Briefcase size={16} />}
          >
            View Experience
          </Button>
          <Button
            href="/education"
            variant="secondary"
            icon={<GraduationCap size={16} />}
          >
            View Education
          </Button>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-16 max-w-3xl"
        >
          <motion.section
            variants={fadeInUp}
            aria-labelledby="resume-experience"
          >
            <h2
              id="resume-experience"
              className="text-section text-(--theme-text) mb-6 flex items-center gap-3"
            >
              <Briefcase
                size={20}
                aria-hidden="true"
                className="text-(--theme-text-muted)"
              />
              Work Experience
            </h2>
            {experiences.length === 0 ? (
              <ExperienceEmpty />
            ) : (
              <div className="space-y-8">
                {experiences.map((exp) => (
                  <article
                    key={exp.title + exp.period}
                    className="pb-6 border-b border-(--theme-border)"
                  >
                    <EntryHeader title={exp.title} period={exp.period} />
                    <p className="text-(--theme-text-secondary)">
                      {exp.company} · {exp.location}
                    </p>
                    <ul className="mt-3 space-y-1.5 list-disc pl-5 marker:text-(--theme-text-muted)">
                      {exp.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="text-sm text-(--theme-text-secondary)"
                        >
                          {r}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </motion.section>

          <motion.section
            variants={fadeInUp}
            aria-labelledby="resume-education"
          >
            <h2
              id="resume-education"
              className="text-section text-(--theme-text) mb-6 flex items-center gap-3"
            >
              <GraduationCap
                size={20}
                aria-hidden="true"
                className="text-(--theme-text-muted)"
              />
              Education
            </h2>
            <div className="space-y-8">
              {educationData.map((edu) => (
                <article
                  key={edu.degree}
                  className="pb-6 border-b border-(--theme-border)"
                >
                  <EntryHeader title={edu.degree} period={edu.period} />
                  <p className="text-(--theme-text-secondary)">
                    {edu.school} · {edu.location}
                  </p>
                  {edu.coursework.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-label text-(--theme-text-muted) mb-2">
                        Relevant Coursework
                      </h4>
                      <ul className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((c) => (
                          <li key={c}>
                            <Badge variant="outline">{c}</Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </section>
  );
}
