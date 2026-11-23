import { projects } from "./data";

/**
 * Technology name → icon file in public/icons/tech/.
 * Logos: Simple Icons v16.37.0 (CC0), https://simpleicons.org.
 * sql.svg and vscode.svg are generic stand-ins (those brands aren't in Simple Icons).
 */
const ICON_FILES: Record<string, string> = {
  React: "react",
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  JavaScript: "javascript",
  HTML: "html5",
  CSS: "css",
  "Tailwind CSS": "tailwindcss",
  "Framer Motion": "framer",
  Laravel: "laravel",
  PHP: "php",
  "Node.js": "nodedotjs",
  Express: "express",
  Supabase: "supabase",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  SQL: "sql",
  Prisma: "prisma",
  Firebase: "firebase",
  Git: "git",
  GitHub: "github",
  "VS Code": "vscode",
  Docker: "docker",
  Postman: "postman",
  Figma: "figma",
  Vercel: "vercel",
  XAMPP: "xampp",
  Composer: "composer",
  NPM: "npm",
};

/** Public URL of a technology's icon, or null when there is none. */
export function getTechIconSrc(name: string): string | null {
  const file = ICON_FILES[name];
  return file ? `/icons/tech/${file}.svg` : null;
}

/** Titles of projects whose data lists this technology. Never inferred. */
export function getProjectsUsing(name: string): string[] {
  return projects
    .filter((project) => project.tech.includes(name))
    .map((p) => p.title);
}
