import DocumentShell from "@/components/layout/document-shell";
export { metadata } from "@/components/layout/document-shell";

export default function EntryLayout({ children }: { children: React.ReactNode }) {
  return <DocumentShell>{children}</DocumentShell>;
}
