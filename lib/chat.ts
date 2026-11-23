import { chatKnowledge } from "./constants";

export interface ChatMessage {
  role: "user" | "bot";
  content: string;
}

export interface ChatSuggestion {
  label: string;
  query: string;
}

export const chatSuggestions: ChatSuggestion[] = [
  { label: "Projects", query: "Tell me about your projects" },
  { label: "Experience", query: "What is your work experience?" },
  { label: "Education", query: "Where did you study?" },
  { label: "Tech Stack", query: "What technologies do you use?" },
  { label: "Resume", query: "Can I download your resume?" },
  { label: "Contact", query: "How can I contact you?" },
];

const GREETING =
  "Hello! I'm Jaja. I can tell you about Jaycee's projects, experience, education, tech stack, resume, or how to contact them. What would you like to know?";

const FALLBACK =
  "I'm not sure about that. Try asking about Jaycee's skills, projects, experience, education, resume, or how to contact them.";

interface ChatRule {
  keywords: readonly string[];
  content: string;
}

/**
 * Checked in order; the first rule with a matching whole word wins. Specific
 * topics come before the general "about" rule, so "about your projects"
 * answers with projects. Answers are predefined; nothing is generated.
 */
const CHAT_RULES: readonly ChatRule[] = [
  {
    keywords: ["project", "projects", "portfolio", "jayfolio", "kit"],
    content: chatKnowledge.projects.content,
  },
  {
    keywords: [
      "skill",
      "skills",
      "tech",
      "technology",
      "technologies",
      "stack",
      "framework",
      "frameworks",
      "language",
      "languages",
      "tools",
    ],
    content: chatKnowledge.skills.content,
  },
  {
    keywords: [
      "experience",
      "work",
      "job",
      "jobs",
      "intern",
      "internship",
      "career",
    ],
    content: chatKnowledge.experience.content,
  },
  {
    keywords: [
      "education",
      "university",
      "school",
      "study",
      "studies",
      "college",
      "degree",
      "course",
      "coursework",
    ],
    content: chatKnowledge.education.content,
  },
  {
    keywords: ["resume", "cv", "download"],
    content: chatKnowledge.resume.content,
  },
  {
    keywords: ["contact", "email", "reach", "hire", "linkedin", "github"],
    content: chatKnowledge.contact.content,
  },
  {
    keywords: ["about", "who", "yourself", "name", "focus", "background"],
    content: chatKnowledge.about.content,
  },
  {
    keywords: ["hi", "hello", "hey"],
    content: GREETING,
  },
];

export function getResponse(input: string): string {
  const words = new Set(input.toLowerCase().match(/[a-z0-9]+/g) ?? []);

  for (const rule of CHAT_RULES) {
    if (rule.keywords.some((keyword) => words.has(keyword))) {
      return rule.content;
    }
  }

  return FALLBACK;
}
