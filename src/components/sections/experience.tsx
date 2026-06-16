import { MapPin } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";
import { SectionHeading } from "./section-heading";

export function Experience({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.experience;
  const headingId = `${id}-heading`;
  const currentLabel = content.locale === "mk" ? "Моментално" : "Current";

  return (
    <section id={id} aria-labelledby={headingId} className="bg-muted/35 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id={headingId}
          tag={content.experience.tag}
          title={content.experience.title}
          subtitle={content.experience.subtitle}
        />

        <div className="relative space-y-5 before:absolute before:left-4 before:top-3 before:h-[calc(100%-1rem)] before:w-px before:bg-border sm:before:left-5">
          {content.experience.items.map((item, index) => (
            <Reveal key={`${item.company}-${item.period}`} delay={Math.min(index * 0.04, 0.2)}>
              <div className="relative pl-12 sm:pl-16">
                <span
                  className={
                    index === 0
                      ? "absolute left-1.5 top-7 grid size-7 place-items-center rounded-full border border-blue-500/50 bg-background shadow-sm ring-4 ring-blue-500/10 sm:left-2.5"
                      : "absolute left-1.5 top-7 grid size-7 place-items-center rounded-full border border-blue-500/30 bg-background shadow-sm sm:left-2.5"
                  }
                >
                  <span className={index === 0 ? "size-3 rounded-full bg-blue-600" : "size-2.5 rounded-full bg-blue-600"} />
                </span>
                <Card
                  className={
                    index === 0
                      ? "rounded-3xl border-blue-500/30 bg-blue-500/[0.04] shadow-sm transition-shadow hover:shadow-md dark:bg-blue-500/[0.08]"
                      : "rounded-3xl border-border/80 shadow-sm transition-shadow hover:shadow-md"
                  }
                >
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-black tracking-tight">{item.role}</h3>
                          {index === 0 ? (
                            <Badge className="rounded-full bg-blue-600 text-white hover:bg-blue-600">
                              {currentLabel}
                            </Badge>
                          ) : null}
                        </div>
                        <p className="mt-1 font-semibold text-blue-600 dark:text-blue-400">
                          {item.company}
                        </p>
                      </div>
                      <div className="text-sm font-semibold text-muted-foreground md:text-right">
                        <p>{item.period}</p>
                        <p className="mt-1 inline-flex items-center gap-1 md:justify-end">
                          <MapPin className="size-3.5" />
                          {item.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-5 text-pretty leading-7 text-muted-foreground">{item.summary}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="rounded-full">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
