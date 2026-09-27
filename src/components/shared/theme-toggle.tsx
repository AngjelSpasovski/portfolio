"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePortfolioTheme } from "@/components/theme-provider";
import type { Locale } from "@/i18n/content";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { theme, toggleTheme } = usePortfolioTheme();
  const isDark = theme === "dark";
  const label =
    locale === "mk"
      ? isDark
        ? "Префрли на светла тема"
        : "Префрли на темна тема"
      : isDark
        ? "Switch to light theme"
        : "Switch to dark theme";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-10 rounded-full"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
