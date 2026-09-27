# Architecture And Technology Stack

## Runtime Model

The application is a statically exported Next.js portfolio deployed to GitHub Pages. Public content is available at `/en/` and `/mk/`. The root route is a minimal client redirect to `/en/` and is excluded from search indexing.

The current application has no server runtime, database, authentication, or API routes.

`src/app/[locale]/layout.tsx` statically generates only EN and MK and supplies the initial HTML language through a shared document shell. The root redirect has its own `(entry)` layout; route groups add no URL segments. Locale metadata lives in `src/i18n/pages`. The client language synchronizer also maintains `lang` during navigation.

The floating back-to-top control appears after Home leaves the viewport, preserves the locale URL, respects reduced motion, and returns keyboard focus to the main heading. Work History uses one responsive CSS axis for both the line and marker centers.

Project cards and details derive translated category labels from canonical `category` values. These labels describe ownership separately from live/private availability.

To run E2E against an existing local server in PowerShell, set `$env:E2E_BASE_URL='http://localhost:3000'` before `npm run test:e2e`. Without that variable the runner starts and stops its own server on port 3100.

## Technology Stack

### Application

- Next.js 16 with the App Router and static export
- React 19
- TypeScript 5
- Tailwind CSS 4
- Base UI and shadcn-compatible primitives
- Lucide React icons
- Motion for restrained reveal animation

### Quality And Delivery

- ESLint with the Next.js configuration
- Playwright end-to-end tests for routes, localization, navigation state, and project details
- GitHub Actions
- GitHub Pages
- Python and ReportLab tooling for CV generation
- Sharp tooling for the verified social preview PNG

## Source Ownership

- `src/app` - routes, metadata, sitemap, robots, and global CSS
- `src/components/layout` - header and footer
- `src/components/sections` - portfolio sections
- `src/components/shared` - reusable behavior and presentation
- `src/components/ui` - low-level UI primitives
- `src/config/site.ts` - shared URLs, email, and public asset paths
- `src/i18n` - localized content and content types
- `src/data/project-visuals.ts` - project preview configuration
- `src/lib` - framework-independent helpers
- `public/images` - public image assets
- `public/cv` - downloadable CV output
- `scripts` - local generation and maintenance scripts
- `docs` - product and engineering memory

## Data Flow

`src/data/portfolio-data.json` is the canonical source for experience, skills, projects, certifications, and profile counters. `src/data/portfolio-data.ts` types and validates that data during the application build.

The data flow is:

1. Localized values live in the same entity.
2. Website sections select the requested locale.
3. Project visuals reference the same project ID.
4. Statistics are derived from the data.
5. A validation step rejects incomplete or inconsistent entries.
6. The Python CV generator reads the same JSON directly.

UI navigation and section copy remain in `src/i18n/content.ts` because they are presentation-specific translations, not reusable domain records. Project visuals remain in `src/data/project-visuals.ts` and reference the same project IDs.

## Styling Boundary

The project is Tailwind-first.

- Keep component layout, spacing, responsive rules, and visual states close to JSX.
- Use `src/app/globals.css` for theme tokens, base styles, global browser behavior, and genuinely reused semantic utilities.
- Extract repeated UI into a React component before creating one-off CSS abstractions.
- Do not add SCSS, CSS Modules, or another styling system unless repeated complexity demonstrates a concrete need.

Review all styling changes for dark/light contrast, focus visibility, layout shift, text fit, and mobile behavior.

## Architectural Constraints

- Static export must continue to work with the `/portfolio` base path.
- Public asset paths must use the existing base-path helper.
- Section navigation must not add route fragments or replace `/en/` and `/mk/`.
- Project entries must use one shared card and visual-preview contract.
- Private projects must not expose repositories, internal URLs, or sensitive data.
