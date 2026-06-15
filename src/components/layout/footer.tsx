import { Mail } from "lucide-react";

import { Logo } from "@/components/shared/logo";
import { SocialLinks } from "@/components/shared/social-links";
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-300"
          >
            <Mail className="size-4" />
            angjel.spasovski@gmail.com
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
