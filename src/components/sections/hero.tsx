import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/config/site";
import type { SiteContent } from "@/i18n/content";
import { assetPath } from "@/lib/asset-path";

export function Hero({ content }: { content: SiteContent }) {
  const projectsHref = content.nav[3]?.href ?? "#projects";
  const contactHref = content.nav[content.nav.length - 1]?.href ?? "#contact";
  const emailAddress = content.social.email.replace("mailto:", "");
  const sectionId = content.locale === "mk" ? "pochetok" : "home";
  const headingId = `${sectionId}-heading`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="relative overflow-hidden px-5 pb-20 pt-28 sm:pt-32 lg:min-h-screen lg:pb-20 lg:pt-36"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),linear-gradient(to_bottom,transparent,rgba(244,244,245,0.45))] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.2),transparent_34%),linear-gradient(to_bottom,transparent,rgba(39,39,42,0.45))]" />
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-14">
        <Reveal className="space-y-7 lg:pt-3">
          <Badge
            variant="outline"
            className="rounded-full border-blue-500/30 bg-blue-500/10 px-4 py-2 text-blue-700 dark:text-blue-300"
          >
            {content.hero.badge}
          </Badge>

          <div className="space-y-5">
            <p className="max-w-3xl text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              {content.hero.eyebrow}
            </p>
            <h1
              id={headingId}
              className="max-w-4xl text-balance text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              {content.hero.title}{" "}
              <span className="text-blue-600 dark:text-blue-400">{content.hero.highlight}</span>
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
              {content.hero.description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={projectsHref}
              className={buttonVariants({
                size: "lg",
                className:
                  "h-11 rounded-full bg-blue-600 px-7 font-bold text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400",
              })}
            >
              {content.hero.primaryCta}
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
            <Link
              href={contactHref}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "h-11 rounded-full px-7 font-bold dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
              })}
            >
              {content.hero.secondaryCta}
            </Link>
            <a
              href={assetPath(siteConfig.paths.cv)}
              download
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className:
                  "h-11 rounded-full border-zinc-300 bg-white px-7 font-bold text-zinc-950 shadow-sm hover:bg-zinc-100 dark:border-white/15 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200",
              })}
            >
              {content.hero.cvCta}
              <Download className="ml-2 size-4" />
            </a>
          </div>

          <div className="grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {content.hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-border bg-card/70 p-4 shadow-sm backdrop-blur"
              >
                <div className="text-2xl font-black tracking-tight text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative mx-auto flex w-full max-w-sm flex-col items-center lg:max-w-md lg:pt-2">
          <div className="absolute inset-x-4 top-20 h-14 rounded-full bg-foreground/5 blur-xl dark:bg-black/30" />
          <a
            href={content.social.email}
            aria-label={`${content.contact.emailLabel}: ${emailAddress}`}
            className="relative z-10 mb-4 inline-flex min-h-11 max-w-full items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-bold text-foreground shadow-lg backdrop-blur transition-colors hover:border-blue-500 hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-zinc-900/90 dark:hover:text-blue-300"
          >
            <Mail className="size-4 shrink-0" />
            <span className="break-all">{emailAddress}</span>
          </a>
          <div className="absolute -inset-x-4 top-16 bottom-10 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-3 shadow-2xl">
            <Image
              src={assetPath("/images/profile.jpg")}
              alt="Angjel Spasovski"
              width={1024}
              height={1536}
              priority
              className="aspect-[4/5] rounded-[1.45rem] object-cover object-[center_28%]"
            />
          </div>
          <div className="relative z-10 -mt-6 rounded-full border border-border bg-background/90 p-2 shadow-xl backdrop-blur dark:bg-zinc-950/90">
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
        </Reveal>
      </div>
    </section>
  );
}
