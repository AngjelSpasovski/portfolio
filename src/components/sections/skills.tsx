import { Reveal } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";
import { SectionHeading } from "./section-heading";

export function Skills({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.skills;

  return (
    <section id={id} className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag={content.skills.tag}
          title={content.skills.title}
          subtitle={content.skills.subtitle}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.skills.groups.map(({ title, icon: Icon, items }, index) => (
            <Reveal key={title} delay={Math.min(index * 0.04, 0.2)}>
              <Card className="h-full rounded-3xl border-border/80 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-2xl bg-foreground text-background">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-lg font-black tracking-tight">{title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-muted/70 px-3 py-1.5 text-sm font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
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
