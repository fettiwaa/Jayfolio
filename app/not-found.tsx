"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { panelItem } from "@/lib/animations";

// Rendered inside the root layout's <main>, so this uses a plain wrapper, not another <main>.
export default function NotFound() {
  return (
    <div className="max-width-content mx-auto section-padding-x min-h-[70vh] flex items-center justify-center py-16">
      <motion.div
        variants={panelItem}
        initial="hidden"
        animate="visible"
        className="panel w-full max-w-md"
      >
        <div className="panel-header">
          <p className="text-label text-(--theme-text-muted)">
            <span aria-hidden="true">~/ </span>error
          </p>
          <p className="text-label text-(--theme-text-muted)">404</p>
        </div>
        <div className="panel-body text-center">
          <p
            aria-hidden="true"
            className="font-mono text-xs text-(--theme-text-muted) mb-4"
          >
            $ cd {"<"}page{">"} → no such file or directory
          </p>
          <h1 className="text-page-title text-(--theme-text) mb-3">
            Page not found
          </h1>
          <p className="mb-6 text-(--theme-text-secondary)">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Button href="/" variant="primary">
            Back to Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
