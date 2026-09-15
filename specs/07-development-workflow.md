# Spec-Driven Development Workflow

## Goal

Use AI agents to implement the portfolio from explicit specifications rather than from a single broad prompt.

## Phase 0 — Inputs

Before implementation, collect:

- final professional title
- approved profile text
- GitHub URL
- LinkedIn URL
- email
- CV file, if applicable
- 3–4 projects
- project URLs
- project repositories
- experience history
- verified technology list
- optional profile image

Do not begin by guessing these values.

## Phase 1 — Bootstrap

Agent tasks:

1. create Angular application
2. configure Angular 21 LTS
3. configure Tailwind
4. configure Font Awesome SVG usage
5. configure routing
6. configure GitHub Pages deployment
7. establish lint/test/build workflow

Acceptance: clean production build.

## Phase 2 — Design system

Agent tasks:

1. implement semantic color tokens
2. implement light/dark themes
3. establish typography
4. establish spacing and container rules
5. establish buttons, links, cards and section primitives
6. establish Noir visual accents

Acceptance: a standalone style playground or representative page demonstrates all shared primitives in both themes.

## Phase 3 — Application shell

Agent tasks:

1. header
2. navigation
3. theme switcher
4. footer
5. global layout
6. route transitions if justified

Acceptance: all routes can be reached and the shell is responsive.

## Phase 4 — Content model

Agent tasks:

1. create TypeScript interfaces
2. create structured content source
3. add approved profile data
4. add approved projects
5. add approved experience
6. add approved skills

Acceptance: components consume content data rather than duplicating it.

## Phase 5 — Feature pages

Implement in this order:

1. Home
2. Projects index
3. Project detail
4. Experience
5. Skills
6. About
7. Contact
8. 404

After each page, validate against the relevant requirements.

## Phase 6 — Quality

Validate:

- accessibility
- responsive behavior
- theme consistency
- SEO metadata
- performance
- external links
- GitHub Pages routing
- broken links
- missing images
- placeholder leakage

## Phase 7 — Deployment

Build the production artifact and deploy to GitHub Pages.

Verify:

- root URL
- direct access to nested routes
- refresh on nested route
- assets
- theme persistence
- external links
- 404 behavior

## Definition of Done

A feature is done only when:

- its requirements are satisfied
- the visual design is consistent
- both themes work
- mobile layout works
- accessibility has been checked
- build passes
- tests pass where applicable
- no invented content was introduced
- no unrelated files were modified
