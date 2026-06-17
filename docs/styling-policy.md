# Styling Policy

The portfolio uses a Tailwind-first styling approach.

## Decision

Keep styling close to the component when the styles describe that component's layout, spacing, responsive behavior, and visual state.

Use `src/app/globals.css` only for:

- theme tokens and CSS variables
- base element styles
- global browser behavior
- very small semantic utilities that are reused across multiple components

Do not introduce separate SCSS files unless the project grows into a larger app with complex shared styling rules that Tailwind and component extraction no longer handle cleanly.

## Why

This keeps one main styling system instead of mixing Tailwind, CSS modules, and SCSS without a clear boundary.

It also keeps responsive behavior visible where the markup is rendered, which makes section work easier to review and modify.

## When To Extract A Component

Prefer extracting a React component before extracting CSS when:

- a visual pattern repeats in multiple sections
- the JSX becomes difficult to scan
- a piece has its own behavior or state
- future data-driven usage is likely

Current examples:

- `SectionHeading`
- `SocialLinks`
- `ProjectVisualPreview`
- UI primitives in `src/components/ui`

## When To Add A CSS Utility

Add a semantic utility in `globals.css` only when:

- the same Tailwind class group appears in several unrelated components
- the utility name describes a real design concept
- the abstraction improves readability instead of hiding one-off styling

Avoid utilities for single-use styling.

## Review Checklist

Before adding new styling:

- Check whether an existing UI/shared component already fits.
- Keep hover and focus states stable without layout shift.
- Verify light and dark contrast.
- Keep responsive classes close to the affected markup.
- Avoid introducing a second styling convention for one isolated case.
