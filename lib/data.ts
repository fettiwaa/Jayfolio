import type { Project, Experience, Education, SkillCategory } from "./types";

export const projects: Project[] = [
  {
    slug: "jayfolio-v3",
    title: "JayFolio V3",
    description:
      "A premium portfolio redesign with cinematic motion, a dual-theme system, and a monochrome design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2026",
    status: "Ongoing",
    role: "Designer & Developer",
    thumbnail: "/images/projects/jayfolio-v3.png",
    github: "https://github.com/fettiwaa/Jayfolio",
    demo: "https://jayfolio-fty.vercel.app",
    featured: true,
    href: "/projects/jayfolio-v3",
  },
  {
    slug: "ai-engineering-kit",
    title: "AI Engineering Kit",
    description:
      "A modular, vendor-neutral engineering rulebook for AI coding agents, with one command to adopt it in any project.",
    tech: ["PowerShell", "Markdown", "AGENTS.md", "Claude Code"],
    year: "2026",
    status: "Ongoing",
    role: "Creator & Maintainer",
    thumbnail: "/images/projects/ai-engineering-kit.svg",
    github: "https://github.com/fettiwaa/AI-Engineering-Kit",
    demo: "",
    featured: true,
    href: "/projects/ai-engineering-kit",
  },
];

// Experience content is hidden for now. To restore, uncomment the entry below
// and the matching text in chatKnowledge (lib/constants.ts).
export const experiences: Experience[] = [
  // {
  //   period: "2026 – Present",
  //   title: "Software Engineering Intern",
  //   company: "MindTech Synergy",
  //   location: "Remote",
  //   responsibilities: [
  //     "Develop web applications using Laravel and PHP",
  //     "Maintain and optimize backend systems",
  //     "Collaborate with team using Git workflows",
  //     "Implement new features and bug fixes",
  //     "Participate in the full software development lifecycle",
  //   ],
  // },
];

export const educationData: Education[] = [
  {
    period: "2023 – Present",
    degree: "Bachelor of Science in Computer Science",
    school: "Batangas State University",
    location: "Batangas City",
    coursework: [
      "Software Engineering",
      "Database Systems",
      "Web Development",
      "Operating Systems",
      "Data Structures",
      "Algorithms",
      "Object-Oriented Programming",
      "Computer Networks",
    ],
    awards: ["Dean's List — 2024", "Dean's List — 2025"],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    label: "Backend",
    items: ["Laravel", "PHP", "Node.js", "Express", "Supabase"],
  },
  {
    // PostgreSQL and MySQL live here only (they were also listed under Backend).
    label: "Database",
    items: ["SQL", "PostgreSQL", "MySQL", "Prisma", "Firebase"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Docker",
      "Postman",
      "Figma",
      "Vercel",
      "XAMPP",
      "Composer",
      "NPM",
    ],
  },
];
