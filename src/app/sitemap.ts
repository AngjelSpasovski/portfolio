import type { MetadataRoute } from "next";

const siteUrl = "https://angjelspasovski.github.io/portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          mk: `${siteUrl}/mk/`,
        },
      },
    },
    {
      url: `${siteUrl}/mk/`,
      lastModified: new Date("2026-06-15"),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteUrl}/`,
          mk: `${siteUrl}/mk/`,
        },
      },
    },
  ];
}
