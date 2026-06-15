"use client";

import * as React from "react";

import type { Locale } from "@/i18n/content";

export function DocumentLanguage({ locale }: { locale: Locale }) {
  React.useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
