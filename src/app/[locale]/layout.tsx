import { notFound } from "next/navigation";
import DocumentShell from "@/components/layout/document-shell";
export { metadata } from "@/components/layout/document-shell";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "mk" }];
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en" && locale !== "mk") notFound();
  return <DocumentShell locale={locale}>{children}</DocumentShell>;
}
