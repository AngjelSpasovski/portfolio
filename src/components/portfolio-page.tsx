import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { DocumentLanguage } from "@/components/shared/document-language";
import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import type { Locale } from "@/i18n/content";
import { content } from "@/i18n/content";

export function PortfolioPage({ locale }: { locale: Locale }) {
  const pageContent = content[locale];
  const skipLabel = pageContent.locale === "mk" ? "Прескокни до содржината" : "Skip to content";

  return (
    <>
      <DocumentLanguage locale={pageContent.locale} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-background"
      >
        {skipLabel}
      </a>
      <Header
        locale={pageContent.locale}
        nav={pageContent.nav}
        ctaLabel={pageContent.hero.secondaryCta}
      />
      <main id="main-content">
        <Hero content={pageContent} />
        <About content={pageContent} />
        <Experience content={pageContent} />
        <Skills content={pageContent} />
        <Projects content={pageContent} />
        <Certifications content={pageContent} />
        <Contact content={pageContent} />
      </main>
      <Footer content={pageContent} />
    </>
  );
}
