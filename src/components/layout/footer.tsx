import { Mail } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/config/site";
import type { SiteContent } from "@/i18n/content";

export function Footer({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-border bg-muted/30 px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-3">
          <Logo locale={content.locale} />
          <p className="max-w-md text-sm text-muted-foreground">{content.footer}</p>
          <a
            href={content.social.email}
            className="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-white/5 dark:hover:text-blue-300"
          >
            <Mail className="size-4" />
            {siteConfig.emailAddress}
          </a>
        </div>
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
    </footer>
  );
}
