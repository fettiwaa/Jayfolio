"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { panelItem } from "@/lib/animations";

interface PageHeaderProps {
  /** Path segment shown in the breadcrumb, e.g. "projects". */
  path: string;
  title: string;
  subtitle?: string;
  /** Extra content under the subtitle (buttons, metadata). */
  children?: ReactNode;
}

/** Top panel of every inner page: mono breadcrumb, the page's h1, and a short intro. */
export function PageHeader({
  path,
  title,
  subtitle,
  children,
}: PageHeaderProps) {
  return (
    <motion.header variants={panelItem} className="panel">
      <nav aria-label="Breadcrumb" className="panel-header">
        <ol className="flex items-center gap-1.5 text-label text-(--theme-text-muted)">
          <li>
            <Link
              href="/"
              className="transition-colors hover:text-(--theme-text)"
            >
              jayfolio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-(--theme-text)">
            {path}
          </li>
        </ol>
      </nav>
      <div className="panel-body">
        <h1 className="text-page-title text-(--theme-text)">{title}</h1>
        {subtitle && (
          <p className="text-lead mt-2 max-w-2xl text-(--theme-text-secondary)">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </motion.header>
  );
}
