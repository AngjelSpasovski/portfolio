# Project Decisions

These decisions capture current intent. Change them only when new requirements or evidence justify the tradeoff.

## D-001: Static-First Portfolio

**Decision:** Keep the portfolio compatible with Next.js static export and GitHub Pages.

**Reason:** The public site needs reliability, low operational cost, and no server maintenance.

## D-002: Two Content Routes

**Decision:** Public content routes are `/en/` and `/mk/`. Section navigation does not modify the URL.

**Reason:** Locale URLs are clear for sharing and SEO, while a landing page does not need a route per section.

## D-003: Data-Driven Before Dynamic Backend

**Decision:** "Dynamic" means typed, validated, data-driven rendering before it means a database or admin UI.

**Reason:** Most maintainability value can be achieved without authentication, APIs, or a second deployment platform.

## D-004: Tailwind-First Styling

**Decision:** Continue with Tailwind and a small global CSS layer. Do not add SCSS or CSS Modules without demonstrated shared complexity.

**Reason:** One styling system keeps responsive behavior and component ownership easy to review.

## D-005: Evidence Over Keyword Volume

**Decision:** Prefer concise technology lists and project case studies over large tag collections.

**Reason:** Role, constraints, contribution, and outcome communicate seniority more effectively.

## D-006: Privacy Is A Release Requirement

**Decision:** Private enterprise visuals require deliberate sanitization, synthetic data, or confirmed permission. Blur alone is not considered sufficient proof of privacy.

**Reason:** The portfolio must not expose confidential product or customer information.

## D-007: Learning Work Stays Separate

**Decision:** Project Hub is presented as a learning archive or lab, not at the same level as flagship product work.

**Reason:** It should show progression without weakening the senior professional narrative.

## D-008: No Admin Yet

**Decision:** Defer a real admin until content changes frequently, a non-developer needs access, or draft/review/publish workflow becomes necessary.

**Reason:** A canonical model plus validation provides most of the value with much less complexity.

## D-009: Documentation Is Maintained With Code

**Decision:** Relevant documentation and `status.md` are updated in the same change as implementation.

**Reason:** Documentation is useful only when it reflects the actual repository.

## D-010: Preserve Client Locale Navigation

**Decision:** Keep one shared root layout and update the document language immediately on locale render until Next.js static export supports a route-aware root language without separate root layouts.

**Reason:** Separate root layouts can force a full document reload between `/en/` and `/mk/`, recreating the section-loss regression. Preserving smooth section-aware language switching currently has higher practical value; the server-rendered language improvement remains tracked.
