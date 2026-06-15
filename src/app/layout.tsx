import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  metadataBase: new URL("https://angjelspasovski.github.io"),
  title: {
    default: "Angjel Spasovski - Software Engineer",
    template: "%s | Angjel Spasovski",
  },
  description:
    "Software Engineer portfolio focused on frontend engineering, enterprise web applications, and practical product work.",
  icons: {
    icon: assetPath("/favicon.svg"),
  },
  openGraph: {
    title: "Angjel Spasovski - Software Engineer",
    description:
      "Frontend engineering, enterprise web applications, and practical product work.",
    type: "website",
    siteName: "Angjel Spasovski Portfolio",
    images: [
      {
        url: assetPath("/og-image.svg"),
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
    images: [assetPath("/og-image.svg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
