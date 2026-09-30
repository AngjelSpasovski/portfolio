# Current Status And Roadmap

This is the authoritative work list. Update it as part of every implementation phase.

## Completed Foundation

- [x] Next.js portfolio with static export and GitHub Pages deployment
- [x] English and Macedonian content routes
- [x] dark and light themes
- [x] responsive header and section navigation
- [x] profile, experience, skills, projects, certifications, and contact sections
- [x] downloadable two-page CV
- [x] DBStore, Portfolio, Opera MES, and DentCare project presentations
- [x] shared project preview structure with external visual configuration
- [x] centralized public site constants
- [x] responsive visual QA at mobile, tablet, and desktop sizes
- [x] initial privacy blur for Opera MES screenshots
- [x] consolidated project documentation and roadmap
- [x] automated route, locale, navigation, case-study, and data-contract tests
- [x] dependency security audit with zero known vulnerabilities
- [x] canonical inventory of 15 certifications with a five-item chronological preview

## Phase 1 - Content Correctness

- [x] Add `PdfReader` to the DBStore technology list in EN and MK.
- [x] Replace the provisional DBStore stack with the verified Angular 20, Firebase, PDF, Stripe, testing, and tooling inventory.
- [x] Make DBStore and DentCare periods consistent across languages.
- [x] Verify the exact Opera MES stack before publishing additional technology claims.
- [x] Translate the remaining DentCare visual labels in Macedonian.
- [x] Derive the certification count from the canonical certification inventory.
- [x] Add DB Store as a part-time Work History entry and derive the six-company count from canonical experience data.
- [x] Remove the stale project note about being ready for more live projects.

## Phase 2 - Routes, Localization, And Metadata

- [x] Keep `/en/` and `/mk/` as the only content routes.
- [x] Replace the duplicate root English page with a redirect or minimal locale entry point.
- [x] Preserve the visible section when changing language without URL fragments.
- [x] Keep Home, Projects, and Certifications header states accurate.
- [x] Render the correct document language before hydration.
- [x] Add complete English and Macedonian Open Graph and Twitter metadata.
- [x] Replace the SVG social image with a verified 1200 x 630 PNG.

## Phase 3 - Canonical Content Model

- [x] Replace duplicated locale arrays with localized typed entities.
- [x] Use one project ID type across content and visual configuration.
- [x] Add build-time content validation.
- [x] Derive statistics from canonical data.
- [x] Make the CV generator consume the same facts as the website.
- [x] Keep the CV certification selection aligned with the website's five newest canonical records.
- [x] Add localized asset alt text and consistent technology naming.

## Phase 4 - Professional Project Presentation

- [x] Add case-study fields: context, role, challenge, contribution, and outcome.
- [x] Show only five to seven featured technologies on project cards.
- [x] Add an accessible project details drawer or equivalent detail view.
- [x] Clearly label personal, enterprise, client, and learning work using canonical categories.
- [x] Replace Opera MES screenshots with synthetic UI previews; remove the unused login capture.
- [x] Use transparent project logos without solid white backing panels.
- [x] Provide theme-aware DentCare and portfolio logo variants with transparent backgrounds.
- [x] Keep a compact five-item certification grid with an accessible full-inventory toggle.
- [x] Present the portfolio itself as a public project with a bilingual case study and real interface previews.
- [x] Add course and credential links for certifications where available (9 of 15 verified).

## Phase 5 - UX, Accessibility, And Quality

- [x] Add a localized floating back-to-top button with reduced-motion support and keyboard focus return.
- [x] Align Work History markers and the vertical line on a shared responsive axis.
- [x] Align certification titles and metadata on consistent card rows.
- [x] Normalize project-card padding, inset preview framing, theme-aware preview surfaces, content rows, proportions, and action alignment across themes and viewports.

- [x] Localize control labels and use the correct `aria-current` semantics.
- [x] Add Escape, focus management, and return focus to the mobile menu.
- [x] Prevent theme flash when a stored light preference is restored.
- [x] Load the declared fonts consistently or use an intentional system stack.
- [x] Add focused tests for routes, locale switching, data validation, and navigation state.
- [x] Run lint and tests explicitly in CI before the production build.
- [x] Use the same Chrome channel for local and CI end-to-end tests and verify the static export before deployment.
- [x] Add clickable links to the CV and use the remaining second-page space deliberately.
- [x] Add an ATS-first CV variant without a photo while retaining the designed CV.
- [x] Generate designed and ATS CV variants in English and Macedonian with explicit locale filenames.
- [x] Share the localized professional profile between the website and CV generator.
- [x] Present current projects first, with Opera MES and DB Store marked as active work.

## Phase 6 - Optional Enhancements

- [ ] Add project filters only when the number of entries justifies them.
- [ ] Add copy-email feedback if it improves the contact workflow.
- [ ] Consider a compact career overview only if it does not duplicate Experience.
- [x] Use the newer, more natural portrait as the temporary profile image.
- [ ] Replace the temporary AI portrait with an authentic photo when one is available.

## Phase 7 - Project Hub Checkpoint

- [ ] Stop implementation before integrating Project Hub.
- [ ] Request the project link from the user.
- [ ] Audit the Angular application, project inventory, hosting, and available deep links.
- [ ] Agree on the integration strategy before writing code.

See [project-hub.md](project-hub.md). No Project Hub implementation starts before this checkpoint is completed.

## Deferred

- browser-based admin/editor
- backend, database, authentication, and publish workflow
- advanced project filters before the catalogue needs them
