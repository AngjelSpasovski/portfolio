"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { LanguageSwitch } from "@/components/shared/language-switch";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { Locale, NavItem } from "@/i18n/content";

type HeaderProps = {
  locale: Locale;
  nav: NavItem[];
  ctaLabel: string;
};

export function Header({ locale, nav, ctaLabel }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const contactHref = nav[nav.length - 1]?.href ?? "#contact";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-3xl border border-border/80 bg-background/88 px-3 py-3 shadow-sm backdrop-blur-xl sm:px-5">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitch locale={locale} />
          <ThemeToggle />
          <Link
            href={contactHref}
            className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch locale={locale} />
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-full"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-7xl rounded-3xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur-xl lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
