"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { skillCategories } from "@/lib/data";
import { SectionTitle } from "@/components/ui/section-title";
import { TechIcon } from "@/components/ui/icons";
import { staggerFade, fadeInUp } from "@/lib/animations";
import { useDialog } from "@/lib/use-dialog";

const ITEMS_PER_CATEGORY = 5;

// Skills are information, not controls, so they have no hover affordance.
function SkillItem({ name }: { name: string }) {
  return (
    <li className="flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-(--btn-radius) bg-(--theme-surface-elevated) border border-(--theme-border) text-(--theme-text-secondary)">
      <span
        className="w-4 h-4 flex items-center justify-center shrink-0"
        aria-hidden="true"
      >
        <TechIcon name={name} />
      </span>
      <span>{name}</span>
    </li>
  );
}

function SkillsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useDialog({ open, onClose, containerRef: dialogRef });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-(--theme-overlay)"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="skills-dialog-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-(--card-radius) bg-(--theme-surface) border border-(--theme-border) shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 p-5 md:p-6 border-b border-(--theme-border)">
              <h2
                id="skills-dialog-title"
                className="text-subsection text-(--theme-text)"
              >
                All Skills
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 -m-2 rounded-(--btn-radius) text-(--theme-text-secondary) transition-colors hover:text-(--theme-text) hover:bg-(--theme-surface-elevated)"
                aria-label="Close"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="p-5 md:p-6 space-y-8 overflow-y-auto">
              {skillCategories.map((category) => (
                <section
                  key={category.label}
                  aria-labelledby={`skills-dialog-${category.label}`}
                >
                  <h3
                    id={`skills-dialog-${category.label}`}
                    className="text-label text-(--theme-text-muted) mb-4"
                  >
                    {category.label}
                  </h3>
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {category.items.map((item) => (
                      <SkillItem key={item} name={item} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SkillsSectionProps {
  /** True on the /skills page, where the title is the page's main heading. */
  isPage?: boolean;
}

export default function SkillsSection({ isPage = false }: SkillsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const CategoryHeading = isPage ? "h2" : "h3";
  const hasHiddenSkills = skillCategories.some(
    (category) => category.items.length > ITEMS_PER_CATEGORY,
  );

  return (
    <section id="skills" className="section-padding">
      <div className="max-width-content mx-auto section-padding-x">
        <SectionTitle
          as={isPage ? "h1" : "h2"}
          title="Skills"
          subtitle="The technologies and tools I've worked with."
        />

        <motion.div
          variants={staggerFade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 gap-x-12 gap-y-10"
        >
          {skillCategories.map((category) => {
            const hiddenCount = category.items.length - ITEMS_PER_CATEGORY;
            return (
              <motion.div key={category.label} variants={fadeInUp}>
                <div className="flex items-baseline justify-between mb-4">
                  <CategoryHeading className="text-label text-(--theme-text-muted)">
                    {category.label}
                  </CategoryHeading>
                  {hiddenCount > 0 && (
                    <span className="text-xs font-mono text-(--theme-text-muted)">
                      +{hiddenCount} more
                    </span>
                  )}
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {category.items.slice(0, ITEMS_PER_CATEGORY).map((item) => (
                    <SkillItem key={item} name={item} />
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {hasHiddenSkills && (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              aria-haspopup="dialog"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-(--btn-radius) border border-(--theme-border) text-(--theme-text) transition-colors hover:border-(--theme-text-muted) hover:bg-(--theme-surface-elevated)"
            >
              View all skills
            </button>
          </div>
        )}
      </div>

      <SkillsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
