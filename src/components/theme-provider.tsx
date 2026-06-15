"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getThemeSnapshot(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem("portfolio-theme");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function subscribeToThemeChanges(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const notify = () => callback();

  window.addEventListener("storage", notify);
  window.addEventListener("portfolio-theme-change", notify);
  media.addEventListener("change", notify);

  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener("portfolio-theme-change", notify);
    media.removeEventListener("change", notify);
  };
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme: Theme = React.useSyncExternalStore<Theme>(
    subscribeToThemeChanges,
    getThemeSnapshot,
    () => "light",
  );

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const value = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        const nextTheme = getThemeSnapshot() === "dark" ? "light" : "dark";
        window.localStorage.setItem("portfolio-theme", nextTheme);
        window.dispatchEvent(new Event("portfolio-theme-change"));
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function usePortfolioTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("usePortfolioTheme must be used within ThemeProvider");
  }

  return context;
}
