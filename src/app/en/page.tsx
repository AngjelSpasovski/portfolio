import type { Metadata } from "next";

import { PortfolioPage } from "@/components/portfolio-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/portfolio/en/",
    languages: {
      en: "/portfolio/en/",
      mk: "/portfolio/mk/",
    },
  },
  openGraph: {
    url: "/portfolio/en/",
    locale: "en_US",
  },
};

export default function EnglishHome() {
  return <PortfolioPage locale="en" />;
}
