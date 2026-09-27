# Project Hub Integration Checkpoint

## Intent

Project Hub is an existing Angular application containing smaller projects created during the learning process, including work from learning Angular and related frontend concepts.

The portfolio should link to that application and selected child projects without presenting learning exercises as equivalent to flagship professional products.

## Mandatory Stop Point

When all earlier roadmap phases reach the Project Hub phase:

1. Stop implementation.
2. Tell the user that the Project Hub review is ready to begin.
3. Ask for the live URL and, when available, repository or local project path.
4. Inspect the actual application before proposing integration.
5. Agree on the strategy with the user.
6. Only then write integration code.

The current conversation and screenshots are not a substitute for that later audit.

## Questions For The Audit

- Is Project Hub publicly hosted and stable?
- Does every child project have a direct URL?
- Which projects still represent current ability?
- Are screenshots and repository links public and safe?
- Is the Hub responsive and consistent enough to receive portfolio traffic?
- Should the portfolio link only to the Hub or also deep-link selected projects?
- Should Project Hub open externally or have a short local detail view first?

## Preferred Starting Strategy

The likely default is one portfolio card with:

- category `project-hub`
- label such as `Learning lab` or `Project archive`
- a concise explanation of its purpose
- the Angular application technology stack
- one primary link to Project Hub
- optional links to a small curated subset of child projects

This is a hypothesis, not an implementation decision. The audit may produce a better structure.

## Boundaries

- Do not import or duplicate every learning project into the main portfolio.
- Do not rank learning exercises beside Opera MES, DBStore, or DentCare.
- Do not redesign Project Hub before understanding its current structure and hosting constraints.
- Do not introduce backend infrastructure only for this integration.
