import { ArrowUpRight, LockKeyhole } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";
import { SectionHeading } from "./section-heading";

export function Projects({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.projects;
  const visitLabel = content.locale === "mk" ? "Отвори проект" : "Visit project";
  const privateLabel = content.locale === "mk" ? "Приватен производ" : "Private product";

  return (
    <section id={id} className="bg-muted/35 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag={content.projects.tag}
          title={content.projects.title}
          subtitle={content.projects.subtitle}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {content.projects.items.map((project, index) => (
            <Reveal key={project.title} delay={Math.min(index * 0.06, 0.16)}>
              <Card className="h-full overflow-hidden rounded-3xl border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="outline" className="rounded-full">
                        {project.type}
                      </Badge>
                      <h3 className="mt-5 text-2xl font-black tracking-tight">{project.title}</h3>
                    </div>
                    <div className="text-right text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <p>{project.period}</p>
                      <p className="mt-1 text-blue-600 dark:text-blue-400">{project.company}</p>
                    </div>
                  </div>
                  <p className="mt-5 flex-1 text-pretty leading-7 text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="mt-7">
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400"
                      >
                        {visitLabel}
                        <ArrowUpRight className="ml-2 size-4" />
                      </a>
                    ) : (
                      <Button variant="outline" className="rounded-full" disabled>
                        <LockKeyhole className="mr-2 size-4" />
                        {privateLabel}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-7 text-muted-foreground">{content.projects.note}</p>
      </div>
    </section>
  );
}
