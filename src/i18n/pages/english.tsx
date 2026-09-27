import type { Metadata } from "next";

import { PortfolioPage } from "@/components/portfolio-page";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: {
    absolute: "Angjel Spasovski - Software Engineer",
  },
  description:
    "Software Engineer portfolio focused on frontend engineering, enterprise web applications, and practical product work.",
  alternates: {
    canonical: "/portfolio/en/",
    languages: {
      en: "/portfolio/en/",
      mk: "/portfolio/mk/",
    },
  },
  openGraph: {
    title: "Angjel Spasovski - Software Engineer",
    description:
      "Frontend engineering, enterprise web applications, and practical product work.",
    url: "/portfolio/en/",
    locale: "en_US",
    images: [
      {
        url: assetPath(siteConfig.paths.ogImage),
        width: 1200,
        height: 630,
        alt: "Angjel Spasovski - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angjel Spasovski - Software Engineer",
    description:
      "Frontend engineering, enterprise web applications, and practical product work.",
    images: [assetPath(siteConfig.paths.ogImage)],
  },
};

export default function EnglishHome() {
  return <PortfolioPage locale="en" />;
}
