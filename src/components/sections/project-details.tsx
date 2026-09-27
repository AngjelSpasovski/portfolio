"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowUpRight, BookOpenText, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { ProjectItem } from "@/i18n/types";
import { cn } from "@/lib/utils";

type ProjectDetailsProps = {
  locale: "en" | "mk";
  project: ProjectItem;
};

const labels = {
  en: {
    trigger: "View case study",
    close: "Close project details",
    context: "Context",
    role: "Role",
    challenge: "Challenge",
    contribution: "Contribution",
    outcome: "Outcome",
    technologies: "Full technology stack",
    visit: "Visit live project",
  },
  mk: {
    trigger: "Види case study",
    close: "Затвори ги деталите за проектот",
    context: "Контекст",
    role: "Улога",
    challenge: "Предизвик",
    contribution: "Придонес",
    outcome: "Резултат",
    technologies: "Целосен технолошки стек",
    visit: "Отвори го проектот",
  },
} as const;

export function ProjectDetails({ locale, project }: ProjectDetailsProps) {
  const copy = labels[locale];
  const sections = [
    [copy.context, project.caseStudy.context],
    [copy.role, project.caseStudy.role],
    [copy.challenge, project.caseStudy.challenge],
    [copy.contribution, project.caseStudy.contribution],
    [copy.outcome, project.caseStudy.outcome],
  ] as const;

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-5 font-bold")}
      >
        <BookOpenText className="size-4" />
        {copy.trigger}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm" />
        <Dialog.Viewport className="fixed inset-0 z-50 flex justify-end">
          <Dialog.Popup className="h-dvh w-full max-w-2xl overflow-y-auto border-l border-border bg-background p-6 text-foreground shadow-2xl outline-none sm:p-9">
            <div className="flex items-start justify-between gap-5">
              <div>
                <Badge variant="outline" className="rounded-full">
                    {project.categoryLabel}
                </Badge>
                <Dialog.Title className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  {project.title}
                </Dialog.Title>
                <p className="mt-2 text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {project.company}
                </p>
              </div>
              <Dialog.Close
                className={cn(buttonVariants({ variant: "ghost", size: "icon-lg" }), "rounded-full")}
                aria-label={copy.close}
                title={copy.close}
              >
                <X className="size-5" />
              </Dialog.Close>
            </div>

            <Dialog.Description className="mt-6 text-pretty text-base leading-7 text-muted-foreground">
              {project.description}
            </Dialog.Description>

            <p className="mt-4 text-sm font-bold text-muted-foreground">{project.period}</p>

            <div className="mt-9 border-y border-border">
              {sections.map(([label, value]) => (
                <section key={label} className="border-b border-border py-5 last:border-b-0">
                  <h4 className="text-xs font-black uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                    {label}
                  </h4>
                  <p className="mt-2 text-pretty leading-7 text-muted-foreground">{value}</p>
                </section>
              ))}
            </div>

            <section className="mt-8">
              <h4 className="text-xs font-black uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                {copy.technologies}
              </h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border bg-muted/50 px-3 py-1.5 text-xs font-bold text-muted-foreground"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>

            {project.href ? (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-9 inline-flex h-10 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                {copy.visit}
                <ArrowUpRight className="ml-2 size-4" />
              </a>
            ) : null}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
