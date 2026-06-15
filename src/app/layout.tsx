import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "Angjel Spasovski - Software Engineer",
    template: "%s | Angjel Spasovski",
  },
  description:
    "Software Engineer portfolio focused on frontend engineering, enterprise web applications, and practical product work.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Angjel Spasovski - Software Engineer",
    description:
      "Frontend engineering, enterprise web applications, and practical product work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
