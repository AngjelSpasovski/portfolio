# Admin Editor Concept

This portfolio should stay frontend-only for the current version. A future admin/editor can still be planned around the same data contract so project entries remain consistent and easy to maintain.

## Goal

The editor should make it easy to add, preview, and update portfolio projects without changing the public card design for each project manually.

The current project cards already follow this idea:

- one text entry in `src/i18n/content.ts`
- one visual configuration in `src/data/project-visuals.ts`
- one `visualId` connecting the project text to the preview
- one shared project card layout for public and private projects

## Recommended Approach

Start with a static editor model, not a backend.

A good first version would be:

- a typed project data file that follows `docs/project-admin-schema.md`
- a local validation helper that checks required fields
- a preview component that renders the same card used on the live portfolio
- optional JSON export/import if editing outside code becomes useful

This keeps the project deployable on GitHub Pages and avoids adding database, authentication, API routes, or hosting complexity too early.

## Future Form Sections

The editor form can be split into these sections:

- Status: draft, published, archived
- Visibility: public or private
- Basic info: title, type, company, period
- Localized copy: English and Macedonian descriptions
- Links: public URL, repository URL only if intentionally public
- Stack: technology tags
- Visuals: logo, main image, supporting images, privacy blur flag
- Ordering: sort order and featured state

## Public Project Rules

Public projects should have:

- a live URL
- a real logo or product image
- at least one screenshot or preview image
- concise copy that explains the product value
- no private or sensitive data in screenshots

## Private Project Rules

Private projects should have:

- no repository links
- no internal URLs
- blurred or curated screenshots
- generic but accurate copy
- enough visual detail to show UI work without exposing sensitive information

## Validation Checklist

Before a project is published, the editor should validate:

- English and Macedonian copy exists
- `visualId` matches a known visual preview
- public projects have a valid `href`
- screenshots have alt text
- private screenshots are marked with `private: true`
- description length fits the card layout
- stack labels are not duplicated

## When To Add A Real Admin

A browser-based admin is only worth adding when one of these becomes true:

- projects change often enough that code editing becomes slow
- a non-developer needs to update portfolio content
- content needs draft/review/publish workflow
- the portfolio moves away from GitHub Pages to hosting that supports APIs

Until then, a typed static data model gives most of the maintainability benefit with much less complexity.
