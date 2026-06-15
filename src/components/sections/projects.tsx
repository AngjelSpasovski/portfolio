import { ArrowUpRight, Boxes, ChartNoAxesCombined, LockKeyhole, PackageCheck } from "lucide-react";

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
                <CardContent className="flex h-full flex-col p-0">
                  <ProjectPreview variant={project.href ? "store" : "enterprise"} />
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

function ProjectPreview({ variant }: { variant: "store" | "enterprise" }) {
  if (variant === "enterprise") {
    return (
      <div className="border-b border-border/80 bg-zinc-950 p-4 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-300">
                <Boxes className="size-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/45">Opera MES</p>
                <p className="text-sm font-black">Production workflow</p>
              </div>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-200">
              Live operations
            </span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            {["Orders", "Lines", "Quality"].map((label, index) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.06] p-3">
                <div className="h-1.5 w-10 rounded-full bg-blue-300/70" />
                <p className="mt-3 text-xs font-bold text-white/55">{label}</p>
                <p className="mt-1 text-lg font-black">{index === 0 ? "128" : index === 1 ? "12" : "98%"}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/10">
            <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-blue-400 to-emerald-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border/80 bg-gradient-to-br from-slate-950 via-blue-950 to-zinc-950 p-4 text-white">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-blue-950/30">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-300" />
            <span className="size-2.5 rounded-full bg-amber-300" />
            <span className="size-2.5 rounded-full bg-emerald-300" />
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/60">dbstore.online</span>
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-[1fr_0.85fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-blue-500 text-white">
                <PackageCheck className="size-4" />
              </span>
              <div>
                <p className="text-sm font-black">DB Store</p>
                <p className="text-xs font-bold text-white/45">Product website</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {["Catalog", "Orders", "Responsive", "Delivery"].map((label) => (
                <span key={label} className="rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white/70">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.08] p-3">
            <div className="flex items-end gap-1.5">
              {[42, 58, 36, 72, 64, 86].map((height) => (
                <span
                  key={height}
                  className="w-full rounded-t-md bg-gradient-to-t from-blue-500 to-cyan-300"
                  style={{ height }}
                />
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white/55">
              <ChartNoAxesCombined className="size-4 text-cyan-200" />
              Product reach preview
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
