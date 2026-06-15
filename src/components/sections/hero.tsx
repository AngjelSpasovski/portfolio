import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { SocialLinks } from "@/components/shared/social-links";
import type { SiteContent } from "@/i18n/content";

export function Hero({ content }: { content: SiteContent }) {
  const projectsHref = content.nav[3]?.href ?? "#projects";
  const contactHref = content.nav[content.nav.length - 1]?.href ?? "#contact";

  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:pt-36 lg:min-h-screen lg:pb-24 lg:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_34%),linear-gradient(to_bottom,transparent,rgba(244,244,245,0.45))] dark:bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.2),transparent_34%),linear-gradient(to_bottom,transparent,rgba(39,39,42,0.45))]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal className="space-y-7">
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
            <h1 className="max-w-4xl text-balance text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
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
            <Link
              href="/cv/angjel-spasovski-cv.pdf"
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
            </Link>
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

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <div className="absolute -inset-4 rounded-[2.5rem] border border-blue-500/20 bg-blue-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-3 shadow-2xl">
            <Image
              src="/images/profile.jpg"
              alt="Angjel Spasovski"
              width={1024}
              height={1536}
              priority
              className="aspect-[4/5] rounded-[1.45rem] object-cover object-[center_28%]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
