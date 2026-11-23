interface ProjectStatusProps {
  status: string;
  className?: string;
}

/**
 * Monochrome status: the word carries the meaning; the marker shape
 * (filled = completed, ring = in progress) adds a cue without colour.
 */
export function ProjectStatus({ status, className = "" }: ProjectStatusProps) {
  const isCompleted = status === "Completed";

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`inline-block w-1.5 h-1.5 rounded-full border border-current ${
          isCompleted ? "bg-current" : "bg-transparent"
        }`}
      />
      {status}
    </span>
  );
}
