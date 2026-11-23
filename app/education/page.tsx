"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { Badge } from "@/components/ui/badge";
import { educationData } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function EducationPage() {
  return (
    <section className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          as="h1"
          title="Education"
          subtitle="My academic background."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-12"
        >
          {educationData.map((edu) => (
            <motion.article
              key={edu.degree}
              variants={fadeInUp}
              className="py-8 border-y border-(--theme-border)"
            >
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
                <h2 className="text-subsection text-(--theme-text)">
                  {edu.degree}
                </h2>
                <time className="text-label text-(--theme-text-muted)">
                  {edu.period}
                </time>
              </div>
              <p className="text-(--theme-text-secondary)">
                {edu.school} · {edu.location}
              </p>

              {edu.awards && edu.awards.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-label text-(--theme-text-muted) mb-2">
                    Awards
                  </h3>
                  <ul className="space-y-1 text-sm text-(--theme-text)">
                    {edu.awards.map((award) => (
                      <li key={award}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}

              {edu.coursework.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-label text-(--theme-text-muted) mb-3">
                    Relevant Coursework
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <li key={course}>
                        <Badge variant="outline">{course}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
