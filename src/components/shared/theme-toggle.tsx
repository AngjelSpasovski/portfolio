"use client";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePortfolioTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePortfolioTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-10 rounded-full"
      aria-label="Toggle color theme"
      onClick={toggleTheme}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
