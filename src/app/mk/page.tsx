import type { Metadata } from "next";

import { PortfolioPage } from "@/components/portfolio-page";

export const metadata: Metadata = {
  title: "Анѓел Спасовски - Софтверски инженер",
  description:
    "Portfolio страна за frontend engineering, enterprise web апликации и практична product work.",
  alternates: {
    canonical: "/portfolio/mk/",
    languages: {
      en: "/portfolio/",
      mk: "/portfolio/mk/",
    },
  },
  openGraph: {
    title: "Анѓел Спасовски - Софтверски инженер",
    description:
      "Frontend engineering, enterprise web апликации и практична product work.",
    url: "/portfolio/mk/",
    locale: "mk_MK",
  },
};

export default function MacedonianHome() {
  return <PortfolioPage locale="mk" />;
}
