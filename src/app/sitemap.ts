import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.siteUrl}/en/`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteConfig.siteUrl}/en/`,
          mk: `${siteConfig.siteUrl}/mk/`,
        },
      },
    },
    {
      url: `${siteConfig.siteUrl}/mk/`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.siteUrl}/en/`,
          mk: `${siteConfig.siteUrl}/mk/`,
        },
      },
    },
  ];
}
