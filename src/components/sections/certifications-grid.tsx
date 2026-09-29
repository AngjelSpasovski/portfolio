"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp, ExternalLink, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { CertificationItem } from "@/i18n/types";

type CertificationsGridProps = {
  listId: string;
  items: CertificationItem[];
  courseLabel: string;
  credentialLabel: string;
  showAllLabel: string;
  showFewerLabel: string;
};

const compactItemCount = 5;

export function CertificationsGrid({
  listId,
  items,
  courseLabel,
  credentialLabel,
  showAllLabel,
  showFewerLabel,
}: CertificationsGridProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, compactItemCount);

  return (
    <>
      <div
        id={listId}
        className="grid grid-cols-1 justify-center gap-3 sm:grid-cols-[repeat(auto-fit,minmax(13rem,15rem))]"
      >
        {visibleItems.map((item, index) => (
          <Reveal key={item.title} delay={Math.min(index * 0.04, 0.16)}>
            <Card className="h-full rounded-2xl border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500/35 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-4">
                <div className="mb-4">
                  <div className="grid size-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
                    <ShieldCheck className="size-4" />
                  </div>
                </div>
                <h3
                  data-certification-title
                  className="min-h-10 text-sm font-black leading-5 tracking-tight"
                >
                  {item.courseUrl ? (
                    <a
                      href={item.courseUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${courseLabel}: ${item.title}`}
                      className="rounded-sm transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <div
                  data-certification-meta
                  className="mt-3 min-h-[3.25rem] flex-1 space-y-1.5"
                >
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {item.issuer}
                  </p>
                  <p className="inline-flex items-start gap-1.5 text-xs leading-5 text-muted-foreground">
                    <CalendarDays className="mt-0.5 size-3.5" />
                    {item.date}
                  </p>
                </div>
                {item.credentialUrl ? (
                  <a
                    href={item.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex min-h-9 w-fit items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold text-foreground transition-colors hover:border-blue-500/50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400"
                  >
                    {credentialLabel}
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          aria-expanded={showAll}
          aria-controls={listId}
          onClick={() => setShowAll((current) => !current)}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground shadow-sm transition-colors hover:border-blue-500/50 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:hover:text-blue-400"
        >
          {showAll ? showFewerLabel : showAllLabel}
          {showAll ? (
            <ChevronUp className="size-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  );
}
