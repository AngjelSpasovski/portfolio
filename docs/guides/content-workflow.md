# Content Workflow

Domain content is stored once in `src/data/portfolio-data.json`. The website and CV generator both consume this file.

## Change Existing Copy

1. Update domain facts in `src/data/portfolio-data.json` or UI-only copy in `src/i18n/content.ts`.
2. Keep the meaning equivalent while using natural phrasing in each language.
3. Verify both `/en/` and `/mk/` at desktop and mobile widths.
4. Regenerate the CV when shared facts change.
5. Update `docs/status.md` if the change completes or creates a tracked task.

## Add A Project

1. Add one localized project entry in `src/data/portfolio-data.json`.
2. Use an existing `visualId` or add a new visual configuration.
3. Add optimized assets under `public/images/projects/<project-id>/`.
4. Keep the public card structure consistent with existing projects.
5. For a public project, add a valid live URL.
6. For a private project, omit repository and internal links.
7. Confirm that every screenshot is approved, sanitized, or uses synthetic data.

Core project fields are:

- `id`, `status`, `visibility`, `category`, and `sortOrder`
- `title`, localized `type`, `period`, `company`, and `summary`
- full and featured technology lists
- optional public links
- optional `visualId`

## Add Project Visuals

Configure the visual in `src/data/project-visuals.ts` with:

- browser or product label
- logo
- main preview
- supporting thumbnails
- localized labels
- privacy state
- supported visual tone

Do not create a custom card layout for each project. Extend the shared visual contract only when the new requirement applies broadly.

## Technology Labels

- Use canonical spelling, for example `Plotly.js`, `AG Grid`, and `Standalone Components`.
- Add only technologies actually used in the project.
- Keep the visible card list concise; the future details view will contain the full list.

## Before Publishing

- content exists in EN and MK
- project period is consistent across languages
- links open the intended public destination
- images have useful alt text
- no private data is visible
- mobile layout has no horizontal overflow
- lint and static build pass
