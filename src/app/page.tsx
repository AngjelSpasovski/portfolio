import type { Metadata } from "next";

import { PortfolioPage } from "@/components/portfolio-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/portfolio/",
    languages: {
      en: "/portfolio/",
      mk: "/portfolio/mk/",
    },
  },
  openGraph: {
    url: "/portfolio/",
    locale: "en_US",
  },
};

export default function Home() {
  return <PortfolioPage locale="en" />;
}
