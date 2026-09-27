<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Portfolio Project Rules

- Treat `src/data/portfolio-data.json` as the canonical source for profile, experience, skills, projects, and certifications.
- Keep English and Macedonian content complete in the same record and preserve `/en/` and `/mk/` as the only public content routes.
- Update the relevant file under `docs/` and `docs/status.md` with every implemented feature or decision.
- Run `npm run lint`, `npm run test:e2e`, and a GitHub Pages build before release.
- Do not add or change Opera MES technology claims without factual confirmation from the owner.
- Stop before Project Hub integration, request its link, audit it, and agree on an integration strategy before coding.
- Do not commit or push changes without explicit approval from the repository owner.
