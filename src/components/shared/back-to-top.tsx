"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { localeConfig, type Locale } from "@/i18n/content";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export function BackToTop({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const homeId = localeConfig[locale].sectionIds.home;
  const label = locale === "mk" ? "Врати се на почеток" : "Back to top";

  useEffect(() => {
    const home = document.getElementById(homeId);
    if (!home) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(home);
    return () => observer.disconnect();
  }, [homeId]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 sm:right-7">
      <Tooltip>
        <TooltipTrigger
          aria-label={label}
          onClick={() => {
            const home = document.getElementById(homeId);
            home?.scrollIntoView({
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              block: "start",
            });
            const heading = home?.querySelector("h1");
            heading?.setAttribute("tabindex", "-1");
            heading?.focus({ preventScroll: true });
          }}
          className="grid size-12 place-items-center rounded-full bg-blue-600 text-white shadow-lg transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent side="left">{label}</TooltipContent>
      </Tooltip>
    </div>
  );
}
