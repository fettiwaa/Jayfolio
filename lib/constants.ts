export const site = {
  name: "Jaycee Andal",
  title: "Full Stack Developer",
  description:
    "Building clean, scalable software that solves real-world problems.",
  email: "jayceeja12@gmail.com",
  github: "https://github.com/fettiwaa",
  linkedin: "https://linkedin.com/in/jaycee-andal",
  resume: "/resume.pdf",
};

/**
 * "Email me" opens Gmail's compose window in a new tab. A plain mailto: link
 * does nothing on computers without a default mail app, so clicks felt dead.
 */
export const emailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(site.email)}`;

export const navLinks = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/education", label: "Education" },
  { href: "/contact", label: "Contact" },
];

export const chatKnowledge = {
  about: {
    title: "About Me",
    content:
      "I am a Computer Science student at Batangas State University pursuing a Bachelor of Science in Computer Science (2023-2027). I am passionate about software engineering, backend systems, web development, and building useful applications. I enjoy learning new technologies and improving development workflows. My goal is to become a software engineer building scalable digital products.",
  },
  skills: {
    title: "Skills",
    content:
      "My core skills include Next.js, React, TypeScript, JavaScript, Tailwind CSS, Framer Motion, HTML, CSS, Laravel, PHP, Node.js, Express, Supabase, PostgreSQL, MySQL, Java, SQL, REST API, Authentication, Git, GitHub, VS Code, Docker, Postman, Figma, Vercel, XAMPP, Composer, and NPM.",
  },
  projects: {
    title: "Projects",
    content:
      "My projects include JayFolio V3 (this portfolio, built with Next.js, TypeScript, Tailwind CSS, and Framer Motion) and the AI Engineering Kit (a vendor-neutral engineering rulebook for AI coding agents like Claude Code, Codex, and Cursor, adopted into any project with one PowerShell command), and TindaScan (an Android inventory and sales app for sari-sari stores with barcode checkout, built in Flutter and Firebase with my classmate Cloyd Robin Castillo).",
  },
  experience: {
    title: "Experience",
    content:
      "Nothing listed yet. I'm focused on my studies and my own projects for now. Ask me about my projects, education, or tech stack!",
  },
  education: {
    title: "Education",
    content:
      "I am pursuing a BS in Computer Science at Batangas State University (2023-2027), with an expected graduation in 2027. My relevant coursework includes Software Engineering, Database Systems, Web Development, Operating Systems, Data Structures, Algorithms, Object-Oriented Programming, and Computer Networks.",
  },
  technologies: {
    title: "Technologies",
    content:
      "I work with Next.js 15, TypeScript, Tailwind CSS v4, React, Framer Motion, PostgreSQL, MySQL, Node.js, Express, PHP, Laravel, Supabase, Java, Git, and NPM. I deploy on Vercel and follow modern web development practices.",
  },
  resume: {
    title: "Resume",
    content:
      "My resume is being updated and isn't available to download right now. You can still explore my Computer Science education at Batangas State University, and my projects, JayFolio, the AI Engineering Kit, and TindaScan.",
  },
  contact: {
    title: "Contact",
    content:
      "You can reach me at jayceeja12@gmail.com. I am also on GitHub at github.com/fettiwaa and LinkedIn at linkedin.com/in/jaycee-andal. Feel free to get in touch!",
  },
};
