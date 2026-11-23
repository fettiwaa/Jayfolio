"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { MotionConfig } from "framer-motion";
import {
  getInitialTheme,
  getResolvedTheme,
  applyTheme,
  getThemeLabel,
  STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  label: string;
}

// The server renders dark (see THEME_INIT_SCRIPT in app/layout.tsx), so the
// first client render assumes dark too; the effect below corrects it.
const defaultContext: ThemeContextValue = {
  theme: "system",
  resolvedTheme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
  label: "System",
};

const ThemeContext = createContext<ThemeContextValue>(defaultContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    const resolved = getResolvedTheme(initial);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const resolved = e.matches ? "dark" : "light";
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  // Flip what the visitor actually sees. Toggling from "system" used to go to
  // "light" even when the system was already light, so the first click did nothing.
  const handleToggle = () => {
    handleSetTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleSetTheme = (next: Theme) => {
    setTheme(next);
    const resolved = getResolvedTheme(next);
    setResolvedTheme(resolved);
    applyTheme(resolved);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this visit only.
    }
  };

  const value = {
    theme,
    resolvedTheme,
    toggleTheme: handleToggle,
    setTheme: handleSetTheme,
    label: getThemeLabel(theme),
  };

  return (
    <ThemeContext.Provider value={value}>
      {/* Framer Motion ignores the CSS reduced-motion rule; this makes it respect the OS setting. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
