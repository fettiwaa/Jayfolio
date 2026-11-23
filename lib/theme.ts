export type Theme = "light" | "dark" | "system";

export const STORAGE_KEY = "theme";

/**
 * Runs in <head> before the page paints, so the first frame already uses the
 * visitor's theme (no dark-to-light flash). Mirrors getInitialTheme() and
 * getResolvedTheme() below; keep the two in sync.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var d=t==='light'||t==='dark'?t:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d);}catch(e){}})();`;

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "system";
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    // Storage blocked (e.g. private mode): fall back to the system theme.
  }
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;
  return "system";
}

export function getResolvedTheme(theme: Theme): "light" | "dark" {
  if (theme === "system") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return theme;
}

export function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
}

export function getThemeLabel(theme: Theme): string {
  switch (theme) {
    case "light":
      return "Light";
    case "dark":
      return "Dark";
    case "system":
      return "System";
  }
}
