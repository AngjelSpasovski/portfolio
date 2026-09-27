import type { Metadata } from "next";
import Script from "next/script";
import "@/app/globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Software Engineer portfolio focused on frontend engineering, enterprise web applications, and practical product work.",
  icons: {
    icon: assetPath(siteConfig.paths.favicon),
  },
  openGraph: {
    title: siteConfig.title,
    description:
      "Frontend engineering, enterprise web applications, and practical product work.",
    type: "website",
    siteName: `${siteConfig.name} Portfolio`,
    images: [
      {
        url: assetPath(siteConfig.paths.ogImage),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description:
      "Frontend engineering, enterprise web applications, and practical product work.",
    images: [assetPath(siteConfig.paths.ogImage)],
  },
};

export default function DocumentShell({
  children,
  locale = "en",
}: Readonly<{
  children: React.ReactNode;
  locale?: "en" | "mk";
}>) {
  return (
    <html lang={locale} className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {/* Shared document shell is rendered only by root layouts. */}
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
        <Script id="portfolio-theme" strategy="beforeInteractive">
          {`try{if(localStorage.getItem("portfolio-theme")==="light"){document.documentElement.classList.remove("dark")}}catch{}`}
        </Script>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
