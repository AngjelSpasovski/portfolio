# Portfolio Documentation

This folder is the project memory. Keep it short, current, and useful when returning to the repository after a break.

## Read First

- [product.md](product.md) - purpose, audience, product principles, and scope
- [architecture.md](architecture.md) - application structure, technology stack, and styling boundaries
- [content-model.md](content-model.md) - target data model and validation rules
- [status.md](status.md) - completed work, current audit findings, and implementation order
- [decisions.md](decisions.md) - decisions that should not be reopened without new evidence
- [project-hub.md](project-hub.md) - future integration and mandatory planning checkpoint

## Working Guides

- [guides/getting-started.md](guides/getting-started.md) - local setup and common commands
- [guides/content-workflow.md](guides/content-workflow.md) - adding or changing localized content and projects
- [guides/release.md](guides/release.md) - validation, CV generation, and GitHub Pages deployment

## Maintenance Rule

Update documentation in the same change as the code when any of these change:

- product behavior or visible feature: update `product.md`
- source structure, data ownership, or dependency: update `architecture.md`
- content fields or validation: update `content-model.md`
- setup, build, CV, or deployment steps: update the relevant guide
- completed or newly found work: update `status.md`
- a lasting tradeoff or constraint: update `decisions.md`
- Project Hub assumptions or strategy: update `project-hub.md`

Do not add a new document when an existing one has clear ownership of the information.
