"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Rendered inside the root layout's <main>, so this uses a plain wrapper, not another <main>.
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center"
      >
        <p className="text-label text-(--theme-text-muted) mb-4">Error 404</p>
        <h1 className="text-page-title text-(--theme-text) mb-3">
          Page not found
        </h1>
        <p className="mb-8 max-w-md text-(--theme-text-secondary)">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
