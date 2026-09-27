# Release And Maintenance

## Pre-Release Checks

```powershell
npm run lint
npm run test:e2e
npm run generate:og
$env:GITHUB_PAGES="true"
npm run build
Remove-Item Env:\GITHUB_PAGES
```

Then verify:

- `/en/` and `/mk/`
- language switching from each major section
- header active state
- dark and light themes
- mobile, tablet, and desktop layouts
- public project links
- CV download
- metadata, sitemap, and robots output
- the generated `public/og-image.png` is 1200 x 630

## Generate The CV

```powershell
python scripts/generate-cv-pdf.py
```

The Opera MES portfolio previews are synthetic and can be regenerated with:

```bash
npm run generate:opera-previews
```

The script writes:

- `public/cv/angjel-spasovski-cv.pdf`
- `output/pdf/angjel-spasovski-cv.pdf`
- `public/cv/angjel-spasovski-ats-cv.pdf`
- `output/pdf/angjel-spasovski-ats-cv.pdf`

The designed CV is intended for direct reading and portfolio presentation. The ATS CV uses a single-column, photo-free layout with standard headings and selectable text for application systems.

Visually inspect every page after generation and confirm that all expected link annotations are present.

## GitHub Pages

`.github/workflows/deploy-pages.yml` deploys pushes to `main`.

The workflow:

1. installs dependencies with `npm ci`
2. runs lint
3. installs the Playwright Chromium runtime and runs end-to-end tests
4. builds with `GITHUB_PAGES=true`
5. uploads `out/`
6. deploys the static artifact to GitHub Pages

Live URL: `https://angjelspasovski.github.io/portfolio/`

Do not commit or push generated or source changes without reviewing the diff and receiving explicit approval for the commit.
