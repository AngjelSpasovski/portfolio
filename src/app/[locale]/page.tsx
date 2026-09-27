import { notFound } from "next/navigation";
import EnglishHome, { metadata as englishMetadata } from "@/i18n/pages/english";
import MacedonianHome, { metadata as macedonianMetadata } from "@/i18n/pages/macedonian";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale === "mk") return macedonianMetadata;
  if (locale === "en") return englishMetadata;
  notFound();
}

export default async function LocalePage({ params }: Props) {
  const { locale } = await params;
  if (locale === "mk") return <MacedonianHome />;
  if (locale === "en") return <EnglishHome />;
  notFound();
}
