"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { localeConfig, type Locale } from "@/i18n/content";

export const LANGUAGE_SWITCH_SECTION_KEY = "portfolio-language-switch-section";

type LanguageSwitchProps = {
  locale: Locale;
  activeHref?: string;
};

function getTargetSectionId(locale: Locale, activeHref?: string) {
  const targetLocale: Locale = locale === "en" ? "mk" : "en";
  const currentSectionId = activeHref?.replace("#", "");
  const currentSectionKey = Object.entries(localeConfig[locale].sectionIds).find(
    ([, sectionId]) => sectionId === currentSectionId,
  )?.[0] as keyof (typeof localeConfig)[Locale]["sectionIds"] | undefined;

  return currentSectionKey ? localeConfig[targetLocale].sectionIds[currentSectionKey] : "";
}

export function LanguageSwitch({ locale, activeHref }: LanguageSwitchProps) {
  const targetLocale: Locale = locale === "en" ? "mk" : "en";
  const target = localeConfig[targetLocale].path;
  const targetSectionId = getTargetSectionId(locale, activeHref);
  const label = locale === "en" ? "MK" : "EN";

  return (
    <Link
      href={target}
      scroll={false}
      aria-label={`Switch language to ${label}`}
      onClick={() => {
        if (targetSectionId) {
          sessionStorage.setItem(LANGUAGE_SWITCH_SECTION_KEY, targetSectionId);
        } else {
          sessionStorage.removeItem(LANGUAGE_SWITCH_SECTION_KEY);
        }
      }}
      className={buttonVariants({
        variant: "outline",
        className: "h-10 rounded-full px-4 text-xs font-bold",
      })}
    >
      {label}
    </Link>
  );
}
