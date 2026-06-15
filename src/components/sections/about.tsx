import { Reveal } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";
import { SectionHeading } from "./section-heading";

export function About({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.about;

  return (
    <section id={id} className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading tag={content.about.tag} title={content.about.title} />
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <Reveal className="space-y-5">
            {content.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.about.facts.map(({ label, value, icon: Icon }) => (
                <Card key={label} className="rounded-3xl border-border/80 shadow-sm">
                  <CardContent className="p-5">
                    <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-blue-600 text-white">
                      <Icon className="size-5" />
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-6 text-foreground">{value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
