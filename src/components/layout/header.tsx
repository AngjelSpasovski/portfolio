"use client";

import { Menu, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { LANGUAGE_SWITCH_SECTION_KEY, LanguageSwitch } from "@/components/shared/language-switch";
import { Logo } from "@/components/shared/logo";
import { ScrollLink } from "@/components/shared/scroll-link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import type { Locale, NavItem } from "@/i18n/content";

type HeaderProps = {
  locale: Locale;
  nav: NavItem[];
  ctaLabel: string;
};

export function Header({ locale, nav, ctaLabel }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState("");
  const contactHref = nav[nav.length - 1]?.href ?? "#contact";

  React.useEffect(() => {
    const targetSectionId = sessionStorage.getItem(LANGUAGE_SWITCH_SECTION_KEY);

    if (!targetSectionId) {
      return;
    }

    sessionStorage.removeItem(LANGUAGE_SWITCH_SECTION_KEY);
    requestAnimationFrame(() => {
      document.getElementById(targetSectionId)?.scrollIntoView({ behavior: "auto", block: "start" });
    });
  }, [locale]);

  React.useEffect(() => {
    const sectionIds = nav.map((item) => item.href.replace("#", "")).filter(Boolean);

    if (!sectionIds.length) {
      return;
    }

    const updateActiveSection = () => {
      const scrollMarker = Math.min(window.innerHeight * 0.35, 260);
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));

      if (!sections.length) {
        return;
      }

      let currentSection = sections[0];
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= scrollMarker) {
          currentSection = section;
        }
      }
      const documentHeight = document.documentElement.scrollHeight;
      const isAtPageEnd = window.innerHeight + window.scrollY >= documentHeight - 4;
      const activeSection = isAtPageEnd ? sections[sections.length - 1] : currentSection;

      if (activeSection?.id) {
        setActiveHref(`#${activeSection.id}`);
      }
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [nav]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-3xl border border-border/80 bg-background/88 px-3 py-3 shadow-sm backdrop-blur-xl sm:px-5">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {nav.map((item) => (
            <ScrollLink
              key={item.href}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              className={
                activeHref === item.href
                  ? "rounded-full bg-blue-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-blue-500 xl:px-4"
                  : "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-4"
              }
            >
              {item.label}
            </ScrollLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitch locale={locale} activeHref={activeHref} />
          <ThemeToggle />
          <ScrollLink
            href={contactHref}
            className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400"
          >
            {ctaLabel}
          </ScrollLink>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch locale={locale} activeHref={activeHref} />
          <ThemeToggle />
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="size-10 rounded-full"
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="mx-auto mt-2 max-w-7xl rounded-3xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur-xl lg:hidden"
        >
          <nav className="grid gap-1" aria-label="Mobile navigation">
            {nav.map((item) => (
              <ScrollLink
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={
                  activeHref === item.href
                    ? "rounded-2xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-blue-500"
                    : "rounded-2xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </ScrollLink>
            ))}
          </nav>
          <ScrollLink
            href={contactHref}
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-2xl bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:hover:bg-blue-400"
            onClick={() => setOpen(false)}
          >
            {ctaLabel}
          </ScrollLink>
        </div>
      ) : null}
    </header>
  );
}
