import type { ReactNode } from "react";

export type BadgeVariant = "default" | "outline" | "ghost";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  icon?: ReactNode;
}

const variantClasses = {
  default:
    "bg-(--theme-surface-elevated) text-(--theme-text) border border-(--theme-border)",
  outline: "border border-(--theme-border) text-(--theme-text-secondary)",
  ghost: "text-(--theme-text-secondary)",
};

export const Badge = ({
  className,
  variant = "default",
  icon,
  children,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-(--badge-radius) transition-colors",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
