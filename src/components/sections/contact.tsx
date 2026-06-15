import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SocialLinks } from "@/components/shared/social-links";
import type { SiteContent } from "@/i18n/content";
import { localeConfig } from "@/i18n/content";

export function Contact({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.contact;

  return (
    <section id={id} className="px-5 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-7xl rounded-[2rem] border border-border bg-foreground p-8 text-background shadow-2xl sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-8 max-w-3xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-blue-300">
                {content.contact.tag}
              </p>
              <h2 className="text-balance text-3xl font-black tracking-tight text-background sm:text-4xl lg:text-5xl">
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
              className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-7 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400"
            >
              {content.contact.emailLabel}
              <ArrowUpRight className="ml-2 size-4" />
            </a>
            <SocialLinks
              github={content.social.github}
              linkedin={content.social.linkedin}
              email={content.social.email}
              labels={{
                github: content.contact.githubLabel,
                linkedin: content.contact.linkedinLabel,
                email: content.contact.emailLabel,
              }}
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
