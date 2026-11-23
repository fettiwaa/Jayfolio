import type { Transition, Variants } from "framer-motion";

/*
 * Motion system. One easing curve and three durations everywhere.
 * Framer Motion respects the OS reduce-motion setting through the
 * <MotionConfig reducedMotion="user"> in components/theme-provider.tsx.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
} as const;

export const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE_OUT,
};

/** Parent of a panel grid: reveals its panels once, in order, on page load. */
export const panelContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/** One panel (or any block) inside a panelContainer. */
export const panelItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** Small hover lift for interactive panels and tiles. */
export const hoverLift = {
  y: -2,
  transition: { duration: DURATION.fast, ease: EASE_OUT },
};
