import { localeConfig, type SiteContent } from "@/i18n/content";
import { CertificationsGrid } from "./certifications-grid";
import { SectionHeading } from "./section-heading";

export function Certifications({ content }: { content: SiteContent }) {
  const id = localeConfig[content.locale].sectionIds.certifications;
  const headingId = `${id}-heading`;
  const listId = `${id}-list`;

  return (
    <section id={id} aria-labelledby={headingId} className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          id={headingId}
          tag={content.certifications.tag}
          title={content.certifications.title}
          subtitle={content.certifications.subtitle}
        />

        <CertificationsGrid
          listId={listId}
          items={content.certifications.items}
          courseLabel={content.certifications.courseLabel}
          credentialLabel={content.certifications.credentialLabel}
          showAllLabel={content.certifications.showAllLabel}
          showFewerLabel={content.certifications.showFewerLabel}
        />
      </div>
    </section>
  );
}
