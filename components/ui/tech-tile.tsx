import type { CSSProperties } from "react";
import { getProjectsUsing, getTechIconSrc } from "@/lib/tech";

type IconStyle = CSSProperties & Record<"--icon", string>;

interface TechLogoProps {
  name: string;
  /** Pixel size of the square icon. */
  size?: number;
  className?: string;
}

/** Monochrome technology logo; takes the current text colour. Decorative. */
export function TechLogo({ name, size = 16, className = "" }: TechLogoProps) {
  const src = getTechIconSrc(name);
  if (!src) return null;
  const style: IconStyle = {
    "--icon": `url(${src})`,
    width: size,
    height: size,
  };
  return (
    <span
      aria-hidden="true"
      className={`tech-icon ${className}`}
      style={style}
    />
  );
}

interface TechTileProps {
  name: string;
}

/** Icon tile for the tech inventory: logo, name, and where it's used (from project data). */
export function TechTile({ name }: TechTileProps) {
  const usedIn = getProjectsUsing(name);
  const usage = usedIn.length > 0 ? `Used in ${usedIn.join(", ")}` : null;

  return (
    <li className="tech-tile group relative">
      <div className="panel-inset h-full flex flex-col items-center justify-center gap-2 min-h-21 px-1.5 py-3 text-(--theme-text-secondary) transition-[color,border-color,translate] duration-150 group-hover:-translate-y-0.5 group-hover:text-(--theme-text) group-hover:border-(--theme-border-strong)">
        <TechLogo
          name={name}
          size={28}
          className="transition-transform duration-150 group-hover:scale-110"
        />
        <span className="w-full text-center text-[0.625rem] leading-tight font-mono uppercase tracking-wide line-clamp-2 wrap-break-word">
          {name}
        </span>
      </div>
      {usage && (
        <>
          <span className="sr-only">{usage}</span>
          <span aria-hidden="true" className="tech-tooltip">
            {usage}
          </span>
        </>
      )}
    </li>
  );
}
