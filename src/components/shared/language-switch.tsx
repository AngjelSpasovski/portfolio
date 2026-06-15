import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/content";

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const target = locale === "en" ? "/mk" : "/";
  const label = locale === "en" ? "MK" : "EN";

  return (
    <Link
      href={target}
      aria-label={`Switch language to ${label}`}
      className={buttonVariants({
        variant: "outline",
        className: "h-10 rounded-full px-4 text-xs font-bold",
      })}
    >
      {label}
    </Link>
  );
}
