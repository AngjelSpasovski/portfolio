# Project Admin Schema

This is the proposed schema for a future project editor/admin form. The current portfolio is static, but keeping this contract clear makes each project entry consistent and easier to migrate later.

## Project Entity

```ts
type PortfolioProject = {
  id: string;
  status: "draft" | "published" | "archived";
  visibility: "public" | "private";
  title: LocalizedText;
  type: LocalizedText;
  period: LocalizedText;
  company: LocalizedText;
  description: LocalizedText;
  stack: string[];
  href?: string;
  visualId?: string;
  sortOrder: number;
};

type LocalizedText = {
  en: string;
  mk: string;
};
```

## Visual Entity

```ts
type ProjectVisual = {
  id: string;
  chromeLabel: string;
  logo: ProjectAsset;
  title: string;
  type: LocalizedText;
  main: ProjectVisualImage;
  thumbnails: ProjectVisualImage[];
  tone: "blue" | "cyan";
};

type ProjectVisualImage = {
  asset: ProjectAsset;
  label: LocalizedText;
  private: boolean;
};

type ProjectAsset = {
  src: string;
  alt: string;
};
```

## Required Fields

Every project should have:

- `id`
- `status`
- `visibility`
- `title.en` and `title.mk`
- `type.en` and `type.mk`
- `period.en` and `period.mk`
- `company.en` and `company.mk`
- `description.en` and `description.mk`
- at least one `stack` item
- `sortOrder`

Public projects should also have:

- `href`

Projects with screenshots should have:

- `visualId`

## Validation Rules

- `id` should be URL-safe: lowercase letters, numbers, and hyphens.
- `href` should be a valid absolute URL.
- `stack` should avoid duplicate labels.
- `description` should be concise enough to fit inside the project card.
- `visualId` should match an existing visual config.
- Private project images should use `private: true` when screenshots contain sensitive or internal UI data.

## Current Static Mapping

The current static implementation maps to this schema like this:

- project text lives in `src/i18n/content.ts`
- project visual data lives in `src/data/project-visuals.ts`
- `visualId` connects the text entry to the visual preview
- shared site values live in `src/config/site.ts`

## Future Admin Form Sections

A practical editor form can be split into these sections:

- Basic info: title, type, company, period, status, visibility
- Localized copy: English description and Macedonian description
- Links: public URL
- Stack: technology tags
- Visuals: visual template, logo, main image, thumbnails, privacy flags
- Publishing: sort order and published state

## Recommended First Version

For this portfolio, the first admin/editor version should not need a backend.

A practical first step can be a local JSON or TypeScript data editor pattern that exports the same shape as the static files. A real backend should only be added if editing from the browser becomes a real requirement.
