import type { Metadata } from "next";

import { PortfolioPage } from "@/components/portfolio-page";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: {
    absolute: "Анѓел Спасовски - Софтверски инженер",
  },
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
    images: [
      {
        url: assetPath(siteConfig.paths.ogImage),
        width: 1200,
        height: 630,
        alt: "Анѓел Спасовски - Софтверски инженер",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Анѓел Спасовски - Софтверски инженер",
    description:
      "Frontend инженеринг, enterprise web апликации и практични софтверски решенија.",
    images: [assetPath(siteConfig.paths.ogImage)],
  },
};

export default function MacedonianHome() {
  return <PortfolioPage locale="mk" />;
}
