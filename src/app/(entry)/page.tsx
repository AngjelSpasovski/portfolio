import type { Metadata } from "next";

import { LocaleRedirect } from "@/components/shared/locale-redirect";

export const metadata: Metadata = {
  title: "Choose language",
  robots: {
    index: false,
    follow: true,
  },
};

export default function Home() {
  return <LocaleRedirect />;
}
