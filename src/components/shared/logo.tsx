import Link from "next/link";

import type { Locale } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localeConfig[locale].path}
      className="group inline-flex items-center gap-3 rounded-full outline-none transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Angjel Spasovski"
    >
      <span className="grid size-11 place-items-center rounded-2xl border border-border bg-foreground text-sm font-black tracking-tight text-background shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-blue-500 group-hover:shadow-md">
        AS
      </span>
      <span className="hidden leading-none sm:block">
        <span className="block text-sm font-bold tracking-tight">Angjel Spasovski</span>
        <span className="mt-1 block text-xs text-muted-foreground">Software Engineer</span>
      </span>
    </Link>
  );
}
