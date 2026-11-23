"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const label =
    resolvedTheme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-(--theme-surface-elevated) text-(--theme-text) border border-transparent transition-colors hover:border-(--theme-border)"
      aria-label={label}
      title={label}
    >
      {/* Both icons render; CSS shows the right one from the first paint, before hydration. */}
      <Sun size={18} aria-hidden="true" className="hidden dark:block" />
      <Moon size={18} aria-hidden="true" className="block dark:hidden" />
    </motion.button>
  );
}
