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

  return (
    <>
      <DocumentLanguage locale={pageContent.locale} />
      <Header
        locale={pageContent.locale}
        nav={pageContent.nav}
        ctaLabel={pageContent.hero.secondaryCta}
      />
      <Hero content={pageContent} />
      <About content={pageContent} />
      <Experience content={pageContent} />
      <Skills content={pageContent} />
      <Projects content={pageContent} />
      <Certifications content={pageContent} />
      <Contact content={pageContent} />
      <Footer content={pageContent} />
    </>
  );
}
