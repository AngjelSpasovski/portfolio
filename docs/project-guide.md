# Project Guide

This guide explains the current portfolio structure and the expected workflow for adding new content.

## Project Structure

- `src/app` contains Next.js routes, metadata, sitemap, and robots output.
- `src/components/layout` contains page-level layout pieces such as header and footer.
- `src/components/sections` contains the portfolio sections rendered on the page.
- `src/components/shared` contains reusable components used across sections.
- `src/components/ui` contains lower-level UI primitives.
- `src/config/site.ts` contains shared site constants such as email, profile links, site URL, and asset paths.
- `src/data/project-visuals.ts` contains visual preview data for project cards.
- `src/i18n/content.ts` contains localized English and Macedonian page content.
- `public/images` contains static image assets.
- `public/cv` contains downloadable CV files.

## Adding A New Project

Add the project entry in both locale objects inside `src/i18n/content.ts`.

The future admin/editor field contract is documented in [project-admin-schema.md](project-admin-schema.md).

The broader editor strategy is documented in [admin-editor-concept.md](admin-editor-concept.md).

Each project should include:

- `title`
- `type`
- `period`
- `company`
- `description`
- `stack`
- `href`, only when the project has a public link
- `visualId`, when a matching visual preview exists

Example:

```ts
{
  title: "Example Project",
  type: "Live project",
  period: "2026",
  company: "Personal / Product",
  description: "Short product description.",
  stack: ["Frontend", "Responsive UI"],
  href: "https://example.com",
  visualId: "example-project",
}
```

## Adding Project Visuals

Add optimized assets under:

```txt
public/images/projects/project-name/
```

Then add a matching visual configuration in `src/data/project-visuals.ts`.

The visual config should provide:

- browser/header label
- logo image
- title and type label
- main preview image
- two supporting thumbnails
- `private: true` on images that should be visually blurred
- a `tone` value for the card background

Keep all project cards on the same visual structure so the future admin/editor can map one form shape to one preview layout.

## Localization

English is the default route at `/`.

Macedonian is available at `/mk/`.

When adding or changing visible content:

- Update both `en` and `mk` blocks in `src/i18n/content.ts`.
- Keep section IDs in `localeConfig` stable because header navigation and scroll tracking depend on them.
- Prefer natural Macedonian phrasing over direct word-for-word translation.

## Shared Site Values

Use `src/config/site.ts` for shared constants:

- email address
- GitHub URL
- LinkedIn URL
- public site URL
- CV path
- favicon and Open Graph image paths

Avoid hardcoding those values inside components.

## CV PDF

The downloadable CV lives at:

```txt
public/cv/angjel-spasovski-cv.pdf
```

It can be regenerated with:

```powershell
python scripts/generate-cv-pdf.py
```

The script also writes a copy to:

```txt
output/pdf/angjel-spasovski-cv.pdf
```

The generated PDF is intentionally compact and aligned with the website content: profile, experience, technical stack, selected projects, certifications, education, and languages.

## Styling Approach

The project uses a Tailwind-first styling approach.

The styling decision is documented in [styling-policy.md](styling-policy.md).

Use component-level Tailwind classes for layout and visual styling. Add semantic CSS utilities in `globals.css` only when a pattern is repeated enough that a named utility improves readability.

Avoid introducing separate SCSS files unless the project grows into a larger application with complex shared styling rules.

## Verification

Before pushing changes, run:

```bash
npm run lint
```

For GitHub Pages output, run:

```powershell
$env:GITHUB_PAGES="true"
npm run build
Remove-Item Env:\GITHUB_PAGES
```
