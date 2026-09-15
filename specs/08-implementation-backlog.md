# Implementation Backlog

This backlog is intentionally incremental. Each item maps to an independent agent prompt under `specs/prompts/`.

## Execution rule

Execute one prompt at a time. After each prompt, validate, inspect the result, fix problems if necessary, and only then proceed.

### Phase 1 — Application baseline

- [ ] 001 — Create Angular application baseline
- [ ] 002 — Configure Tailwind
- [ ] 003 — Configure GitHub Pages build/deployment
- [ ] 004 — Establish application shell and routing baseline

### Phase 2 — Design foundation

- [ ] 005 — Create Noir Comics design tokens
- [ ] 006 — Create theme infrastructure
- [ ] 007 — Create foundational UI components

### Phase 3 — Home

- [ ] 008 — Create Home page structure
- [ ] 009 — Implement Hero
- [ ] 010 — Implement Current / Now highlights
- [ ] 011 — Implement Selected Projects
- [ ] 012 — Implement Core Capabilities
- [ ] 013 — Implement Career Snapshot
- [ ] 014 — Implement About teaser and Contact CTA

### Phase 4 — Content/data

- [ ] 015 — Create domain models and content repository contracts
- [ ] 016 — Connect profile and Home JSON data
- [ ] 017 — Connect project JSON data
- [ ] 018 — Connect skills and experience JSON data

### Phase 5 — Internal pages

- [ ] 019 — About page
- [ ] 020 — Experience page
- [ ] 021 — Projects page and project detail route
- [ ] 022 — Skills page
- [ ] 023 — Education and Certifications page
- [ ] 024 — Contact page
- [ ] 025 — Custom 404 page

### Phase 6 — Quality

- [ ] 026 — Responsive behavior
- [ ] 027 — Accessibility review and fixes
- [ ] 028 — SEO and metadata
- [ ] 029 — Performance review
- [ ] 030 — Automated tests
- [ ] 031 — Production build verification
- [ ] 032 — Final GitHub Pages deployment verification

## Definition of done

The portfolio is complete only when all required routes work, themes work, content is data-driven, the repository boundary permits future API replacement, the site is responsive and accessible, tests/build pass, and GitHub Pages deployment is verified.
