# Content Model

## Goal

Content should be entered once, localized in one record, validated at build time, and reusable by the website, CV generator, and a possible future editor.

## Target Project Entity

```ts
type LocalizedText = {
  en: string;
  mk: string;
};

type PortfolioExperience = {
  id: string;
  role: LocalizedText;
  company: string;
  current: boolean;
  employmentType?: LocalizedText;
  period: LocalizedText;
  location: LocalizedText;
  summary: LocalizedText;
  tags: string[];
};

type PortfolioProject = {
  id: string;
  status: "draft" | "published" | "archived";
  visibility: "public" | "private";
  category: "product" | "enterprise" | "client" | "learning" | "project-hub";
  featured: boolean;
  sortOrder: number;
  title: string;
  type: LocalizedText;
  period: LocalizedText;
  company: LocalizedText;
  summary: LocalizedText;
  caseStudy: {
    context: LocalizedText;
    role: LocalizedText;
    challenge: LocalizedText;
    contribution: LocalizedText;
    outcome: LocalizedText;
  };
  technologies: string[];
  featuredTechnologies: string[];
  links?: {
    live?: string;
    repository?: string;
  };
  visualId?: string;
};
```

## Target Visual Entity

```ts
type ProjectVisual = {
  id: string;
  projectId: string;
  chromeLabel: string;
  logo: ProjectAsset;
  main: ProjectVisualImage;
  thumbnails: ProjectVisualImage[];
  tone: "blue" | "cyan" | "indigo";
};

type ProjectVisualImage = {
  asset: ProjectAsset;
  label: LocalizedText;
  private: boolean;
};

type ProjectAsset = {
  src: string;
  alt: LocalizedText;
};
```

```ts
type PortfolioCertification = {
  id: string;
  title: string;
  issuer: string;
  date: LocalizedText;
  featured: boolean;
  credentialUrl?: string;
};
```

## Validation Rules

- IDs use lowercase letters, numbers, and hyphens.
- Every visible localized value has both `en` and `mk` text.
- Public projects have a valid absolute live or repository URL.
- Private projects have no repository or internal product URL.
- `visualId` references a known visual configuration.
- Images have localized alt text.
- Sensitive images use curated or synthetic data; blur alone is not treated as a privacy guarantee.
- Technology labels use one canonical spelling and have no duplicates.
- Featured technologies are a subset of the full technology list.
- Every published project has all five localized case-study fields.
- Featured technology lists contain five to seven entries.
- Periods describe the same dates in both languages.
- Statistics that can be derived from canonical records are not stored manually.
- Company statistics are derived from unique Work History company names.
- The complete certification inventory stays canonical; `featured` controls the compact website and CV selection.

## Presentation Rules

- Project cards show five to seven technologies at most.
- Full technology lists and case-study content belong in a details view.
- Ownership language must accurately describe personal, client, and team work.
- Learning projects are grouped under Project Hub and do not compete visually with flagship work.

## Current Mapping

- canonical domain data: `src/data/portfolio-data.json`
- data types and validation: `src/data/portfolio-data.ts`
- localized UI composition: `src/i18n/content.ts`
- rendered UI contract: `src/i18n/types.ts`
- visual preview data: `src/data/project-visuals.ts`
- shared public values: `src/config/site.ts`
- CV consumer: `scripts/generate-cv-pdf.py`

Do not build a browser admin before the canonical model and validation are stable. A future editor should consume this contract rather than define a second one.
