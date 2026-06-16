import Image from "next/image";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProjectVisuals } from "@/data/project-visuals";
import type { ProjectVisual, ProjectVisualId, ProjectVisualImage } from "@/data/project-visuals";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";
import { assetPath } from "@/lib/asset-path";
import { SectionHeading } from "./section-heading";

export function Projects({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.projects;
  const headingId = `${id}-heading`;
  const visitLabel = content.locale === "mk" ? "Отвори проект" : "Visit project";
  const privateLabel = content.locale === "mk" ? "Приватен производ" : "Private product";

  return (
    <section id={id} aria-labelledby={headingId} className="bg-muted/35 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id={headingId}
          tag={content.projects.tag}
          title={content.projects.title}
          subtitle={content.projects.subtitle}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {content.projects.items.map((project, index) => (
            <Reveal key={project.title} delay={Math.min(index * 0.06, 0.16)}>
              <Card className="h-full overflow-hidden rounded-3xl border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="flex h-full flex-col p-0">
                  <ProjectPreview
                    locale={content.locale}
                    visualId={project.visualId ?? (project.href ? "dbstore" : "opera-mes")}
                  />
                  <div className="flex h-full flex-col p-6">
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
                        <span
                          key={item}
                          className="rounded-full bg-background px-3 py-1.5 text-xs font-bold text-muted-foreground"
                        >
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

function ProjectPreview({
  locale,
  visualId,
}: {
  locale: SiteContent["locale"];
  visualId: ProjectVisualId;
}) {
  const visuals = getProjectVisuals(locale);

  return <ProjectVisualPreview visual={visuals[visualId]} />;
}

function ProjectVisualPreview({ visual }: { visual: ProjectVisual }) {
  const shellTone =
    visual.tone === "cyan"
      ? "from-zinc-950 via-cyan-950/70 to-zinc-950 shadow-cyan-950/30"
      : "from-slate-950 via-blue-950 to-zinc-950 shadow-blue-950/30";

  return (
    <div className={`border-b border-border/80 bg-gradient-to-br ${shellTone} p-4 text-white`}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-300" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-300" />
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">
            {visual.chromeLabel}
          </span>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-[0.9fr_1.1fr]">
          <div className="flex min-h-40 flex-col justify-between gap-4">
            <div className="grid min-h-28 place-items-center rounded-2xl border border-white/10 bg-white p-4">
              <Image
                src={assetPath(visual.logo.src)}
                alt={visual.logo.alt}
                width={500}
                height={400}
                className="mx-auto h-28 w-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-black">{visual.title}</p>
              <p className="text-xs font-bold text-white/45">{visual.type}</p>
            </div>
          </div>
          <div className="grid gap-3">
            <PreviewImage image={visual.main} large />
            <div className="grid grid-cols-2 gap-3">
              {visual.thumbnails.map((image) => (
                <PreviewImage key={image.src} image={image} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewImage({ image, large = false }: { image: ProjectVisualImage; large?: boolean }) {
  const frameClass = large
    ? "relative min-h-36 overflow-hidden rounded-2xl border border-white/10 bg-black"
    : "relative min-h-16 overflow-hidden rounded-xl border border-white/10 bg-black";
  const imageClass = large ? "h-full min-h-36 w-full" : "h-full min-h-16 w-full";
  const labelClass = large
    ? "absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-bold text-white/75 backdrop-blur"
    : "absolute bottom-2 left-2 rounded-full bg-black/55 px-2 py-1 text-[10px] font-bold text-white/75 backdrop-blur";

  return (
    <div className={frameClass}>
      <Image
        src={assetPath(image.src)}
        alt={image.alt}
        width={large ? 1400 : 700}
        height={large ? 700 : 360}
        className={`${imageClass} object-cover object-top ${image.private ? "opacity-70 blur-[1px]" : "opacity-85"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
      <p className={labelClass}>{image.label}</p>
    </div>
  );
}
