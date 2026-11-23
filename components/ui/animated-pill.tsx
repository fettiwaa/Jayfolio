"use client";

import { motion } from "framer-motion";

export interface AnimatedPillProps {
  label: string;
  delay?: number;
}

export const AnimatedPill = ({ label, delay = 0 }: AnimatedPillProps) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center px-3 py-1.5 rounded-(--badge-radius) text-sm font-medium bg-(--theme-surface-elevated) text-(--theme-text-secondary) border border-(--theme-border)"
    >
      {label}
    </motion.span>
  );
};

AnimatedPill.displayName = "AnimatedPill";
