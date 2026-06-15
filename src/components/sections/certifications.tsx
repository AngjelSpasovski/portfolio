import { ShieldCheck } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import type { SiteContent } from "@/i18n/content";
import { SectionHeading } from "./section-heading";

export function Certifications({ content }: { content: SiteContent }) {
  return (
    <section className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          tag={content.certifications.tag}
          title={content.certifications.title}
          subtitle={content.certifications.subtitle}
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.certifications.items.map((item, index) => (
            <Reveal key={item.title} delay={Math.min(index * 0.04, 0.16)}>
              <Card className="h-full rounded-3xl border-border/80 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-6 grid size-11 place-items-center rounded-2xl bg-blue-600 text-white">
                    <ShieldCheck className="size-5" />
                  </div>
                  <h3 className="text-base font-black leading-6 tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {item.issuer}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.date}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
