import { Mail } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";

export function Contact({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.contact;
  const headingId = `${id}-heading`;
  const emailAddress = content.social.email.replace("mailto:", "");
  const directEmailLabel = content.locale === "mk" ? "Директен email" : "Direct email";

  return (
    <section id={id} aria-labelledby={headingId} className="px-5 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-foreground p-8 text-background shadow-2xl sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-300">
                {content.contact.tag}
              </p>
              <h2 id={headingId} className="text-balance text-3xl font-black tracking-tight text-background sm:text-4xl lg:text-5xl">
                {content.contact.title}
              </h2>
            </div>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-background/75">
              {content.contact.text}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <a
              href={content.social.email}
              aria-label={`${directEmailLabel}: ${emailAddress}`}
              className="inline-flex min-h-11 items-center gap-3 rounded-2xl border border-background/15 bg-background/10 px-4 py-3 text-sm font-semibold text-background transition-colors hover:bg-background/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-600 text-white">
                <Mail className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.18em] text-background/55">
                  {directEmailLabel}
                </span>
                <span className="block break-all">{emailAddress}</span>
              </span>
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
