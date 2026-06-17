import { CalendarDays, ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { localeConfig, type SiteContent } from "@/i18n/content";
import { SectionHeading } from "./section-heading";

export function Certifications({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.certifications;
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id={headingId}
          tag={content.certifications.tag}
          title={content.certifications.title}
          subtitle={content.certifications.subtitle}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.certifications.items.map((item, index) => (
            <Reveal key={item.title} delay={Math.min(index * 0.04, 0.16)}>
              <Card className="h-full rounded-3xl border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:border-blue-500/35 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="grid size-11 place-items-center rounded-2xl bg-blue-600 text-white shadow-sm">
                      <ShieldCheck className="size-5" />
                    </div>
                    <span className="rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-black text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base font-black leading-6 tracking-tight">{item.title}</h3>
                  <div className="mt-5 flex-1 space-y-2">
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {item.issuer}
                    </p>
                    <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="size-4" />
                      {item.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
