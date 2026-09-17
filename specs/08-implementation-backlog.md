# Implementation Backlog

This backlog is intentionally incremental. Each item maps to an independent agent prompt under `specs/prompts/`.

## Execution rule

Execute one prompt at a time. After each prompt, validate, inspect the result, fix problems if necessary, and only then proceed.

### Phase 1 — Application baseline

- [x] 001 — Create Angular application baseline
- [x] 002 — Configure Tailwind
- [x] 003 — Configure GitHub Pages build/deployment
- [x] 004 — Establish application shell and routing baseline

### Phase 2 — Design foundation

- [x] 005 — Create Noir Comics design tokens
- [x] 006 — Create theme infrastructure
- [x] 007 — Create foundational UI components

### Phase 3 — Home

- [x] 008 — Create Home page structure
- [x] 009 — Implement Hero
- [x] 010 — Implement Current / Now highlights
- [x] 011 — Implement Selected Projects
- [x] 012 — Implement Core Capabilities
- [x] 013 — Implement Career Snapshot
- [x] 014 — Implement About teaser and Contact CTA

### Phase 4 — Content/data

- [x] 015 — Create domain models and content repository contracts
- [x] 016 — Connect profile and Home JSON data
- [x] 017 — Connect project JSON data
- [x] 018 — Connect skills and experience JSON data

### Phase 5 — Internal pages

- [x] 019 — About page
- [x] 020 — Experience page
- [x] 021 — Projects page and project detail route
- [x] 022 — Skills page
- [x] 023 — Education and Certifications page
- [x] 024 — Contact page
- [x] 025 — Custom 404 page

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
