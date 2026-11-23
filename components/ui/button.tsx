"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonRadius = "default" | "full";

export interface ButtonProps {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  radius?: ButtonRadius;
  /** Renders a link instead of a button. Paths starting with "/" use client-side navigation. */
  href?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const MotionLink = motion.create(Link);

const variantClasses = {
  primary:
    "bg-(--theme-accent) text-(--theme-bg) hover:bg-(--theme-accent-hover)",
  secondary:
    // Stronger outline + subtle fill so it reads as a button on dark panels.
    "border border-(--theme-border-strong) bg-(--theme-surface-elevated) text-(--theme-text) hover:border-(--theme-text-muted) hover:bg-(--theme-fill)",
  ghost:
    "text-(--theme-text-secondary) hover:text-(--theme-text) hover:bg-(--theme-surface-elevated)",
};

const sizeClasses = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const radiusClasses = {
  default: "rounded-(--btn-radius)",
  full: "rounded-full",
};

const hoverMotion = { y: -1 };
const tapMotion = { scale: 0.98 };

export const Button = ({
  className,
  variant = "primary",
  size = "md",
  radius = "default",
  href,
  icon,
  children,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: ButtonProps) => {
  const allClasses = [
    "inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    radiusClasses[radius],
    className,
  ].join(" ");

  const content = (
    <>
      {icon && (
        <span className="flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </>
  );

  if (href?.startsWith("/")) {
    return (
      <MotionLink
        href={href}
        whileHover={hoverMotion}
        whileTap={tapMotion}
        className={allClasses}
        aria-label={ariaLabel}
      >
        {content}
      </MotionLink>
    );
  }

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <motion.a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        whileHover={hoverMotion}
        whileTap={tapMotion}
        className={allClasses}
        aria-label={ariaLabel}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={hoverMotion}
      whileTap={tapMotion}
      className={allClasses}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
};

Button.displayName = "Button";
