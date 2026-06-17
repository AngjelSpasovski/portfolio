import type { Metadata } from "next";

import { PortfolioPage } from "@/components/portfolio-page";

export const metadata: Metadata = {
  title: "Анѓел Спасовски - Софтверски инженер",
  description:
    "Portfolio страна за frontend инженеринг, enterprise web апликации и практични софтверски решенија.",
  alternates: {
    canonical: "/portfolio/mk/",
    languages: {
      en: "/portfolio/en/",
      mk: "/portfolio/mk/",
    },
  },
  openGraph: {
    title: "Анѓел Спасовски - Софтверски инженер",
    description:
      "Frontend инженеринг, enterprise web апликации и практични софтверски решенија.",
    url: "/portfolio/mk/",
    locale: "mk_MK",
  },
};

export default function MacedonianHome() {
  return <PortfolioPage locale="mk" />;
}
