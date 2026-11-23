"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { navLinks } from "@/lib/constants";
import { useDialog } from "@/lib/use-dialog";

const MOBILE_MENU_ID = "mobile-menu";

/**
 * On the home page, returns the id of the section currently in the middle band
 * of the viewport, or null above the first section (the hero).
 */
function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // The first section in page order that crosses the band wins.
        const current = sections.find((section) => visible.has(section.id));
        setActive(current ? current.id : null);
      },
      // A band 40%–45% down the viewport: a section is "current" while it covers that band.
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      setActive(null);
    };
  }, [enabled]);

  return enabled ? active : null;
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSection = useActiveSection(isHome);
  const menuRef = useRef<HTMLDivElement>(null);

  useDialog({
    open: isOpen,
    onClose: () => setIsOpen(false),
    containerRef: menuRef,
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLinkActive = (href: string) =>
    isHome
      ? activeSection === href.slice(1)
      : pathname === href || pathname.startsWith(`${href}/`);

  const isSolid = scrolled || !isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          isSolid
            ? "bg-(--theme-nav-glass) border-(--theme-border) backdrop-blur-md"
            : "bg-transparent border-transparent"
        }`}
      >
        <nav
          aria-label="Main"
          className="max-width-content mx-auto section-padding-x h-16 flex items-center justify-between"
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-(--theme-text)"
          >
            {/* Same "J" monogram as the favicon. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 32 32"
              className="w-6 h-6 shrink-0"
            >
              <rect
                width="32"
                height="32"
                rx="7"
                className="fill-(--theme-text)"
              />
              <path
                d="M19.5 8v10.5a5 5 0 0 1-10 0"
                fill="none"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="stroke-(--theme-bg)"
              />
            </svg>
            Jaycee Andal
          </Link>

          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    aria-current={
                      isActive ? (isHome ? "location" : "page") : undefined
                    }
                    className={`text-label transition-colors ${
                      isActive
                        ? "text-(--theme-text)"
                        : "text-(--theme-text-secondary) hover:text-(--theme-text)"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {isActive && (
                    <motion.span
                      layoutId="active-underline-nav"
                      aria-hidden="true"
                      className="absolute -bottom-2 left-0 right-0 h-px bg-(--theme-text)"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                    />
                  )}
                </li>
              );
            })}
            <li>
              <ThemeToggle />
            </li>
          </ul>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="p-2.5 -mr-1 text-(--theme-text)"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              aria-expanded={isOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] md:hidden bg-(--theme-menu-bg) backdrop-blur-md"
          >
            <div className="flex flex-col h-full section-padding-x">
              <div className="h-16 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 -mr-1 text-(--theme-text)"
                  aria-label="Close menu"
                >
                  <X size={24} aria-hidden="true" />
                </button>
              </div>
              <ul className="flex flex-col items-center justify-center flex-1 gap-7 pb-16">
                {navLinks.map((link, i) => {
                  const isActive = isLinkActive(link.href);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        aria-current={
                          isActive ? (isHome ? "location" : "page") : undefined
                        }
                        className={`text-2xl underline-offset-8 ${
                          isActive
                            ? "text-(--theme-text) underline decoration-1"
                            : "text-(--theme-text-secondary)"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
