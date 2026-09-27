# Getting Started

## Requirements

- Node.js 22, matching the GitHub Actions workflow
- npm
- Python only when regenerating the CV

## Install

```powershell
npm install
```

## Run Locally

```powershell
npm run dev
```

Open:

- English: `http://localhost:3000/en/`
- Macedonian: `http://localhost:3000/mk/`

The root route redirects to English. Public content routes remain `/en/` and `/mk/`.

## Common Checks

```powershell
npm run lint
npm run test:e2e
npm run build
```

Local tests use an installed Google Chrome browser. To use Playwright's isolated Chromium runtime instead, install it once per development environment:

```powershell
npx playwright install chromium
```

## GitHub Pages Build

```powershell
$env:GITHUB_PAGES="true"
npm run build
Remove-Item Env:\GITHUB_PAGES
```

The exported site is written to `out/` and uses `/portfolio` as its base path.

## Common Locations

- canonical portfolio data: `src/data/portfolio-data.json`
- localized UI content: `src/i18n/content.ts`
- content types: `src/i18n/types.ts`
- project visuals: `src/data/project-visuals.ts`
- shared site settings: `src/config/site.ts`
- project images: `public/images/projects`
- CV output: `public/cv`
- CV generator: `scripts/generate-cv-pdf.py`
