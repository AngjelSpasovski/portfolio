# Angjel Spasovski Portfolio

Personal portfolio website for Angjel Spasovski, focused on frontend engineering, enterprise web applications, selected project work, and CV download.

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- English: `/`
- Macedonian: `/mk/`

## Checks

```bash
npm run lint
npm run build
```

## GitHub Pages Build

The project is configured for static export and GitHub Pages.

To test the GitHub Pages output locally:

```bash
$env:GITHUB_PAGES="true"
npm run build
Remove-Item Env:\GITHUB_PAGES
```

Live URL:

[https://angjelspasovski.github.io/portfolio/](https://angjelspasovski.github.io/portfolio/)
