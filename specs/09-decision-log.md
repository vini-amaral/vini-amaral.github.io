# Decision Log

## ADR-001 — JSON as the initial content source

**Decision:** Portfolio content will be stored in separate structured JSON resources.

**Reason:** Content should be easy to maintain independently from UI code and should have a clean migration path to a structured database/API.

## ADR-002 — Repository boundary before API

**Decision:** Angular components consume typed repository/service contracts. JSON is only the first implementation.

**Reason:** A future API should replace the data adapter, not require a rewrite of feature components.

## ADR-003 — Separate content domains

**Decision:** Profile, About, Experience, Projects, Skills, Education, Certifications, Languages and Social Links are separate resources.

**Reason:** These domains have different lifecycles and may eventually map to different API resources or database tables/collections.

## ADR-004 — Empty project collection initially

**Decision:** Do not invent portfolio projects.

**Reason:** The supplied LinkedIn and postgraduate portfolio files do not provide the concrete project/deployment/repository information needed for credible case studies.

## ADR-005 — Preserve source inconsistencies

**Decision:** Source inconsistencies are flagged rather than silently reconciled.

**Reason:** The source data is the authority until the user confirms a correction.

## ADR-006 — Noir as visual language

**Decision:** Noir Comics influences visual design only. Professional content remains direct and factual.

**Reason:** The site is a professional developer portfolio, not a fictional comic narrative.

## ADR-007 — Hero positioning is editorial, not a LinkedIn copy

**Decision:** Use `Software Engineer & Tech Lead` as the site's primary Hero positioning while retaining the LinkedIn headline as source data.

**Reason:** The website is explicitly a software engineering portfolio, while the current LinkedIn headline emphasizes leadership roles. The site should accurately represent both without pretending they are identical contexts.

## ADR-008 — Home has a dedicated current-state resource

**Decision:** Current professional/learning/project highlights live in `home-highlights.json`.

**Reason:** These statements change more often than durable profile and experience data and should be maintainable independently.

## ADR-009 — Career progression replaces résumé duplication on Home

**Decision:** Home communicates a compact progression narrative; the Experience page contains the complete history.

**Reason:** A modern engineering portfolio should provide evidence and context quickly rather than reproducing LinkedIn verbatim.

## ADR-010 — AI is an active development focus, not an expertise claim

**Decision:** Present AI-assisted development and agentic workflows as a current learning/practice focus based on the construction of this portfolio.

**Reason:** The user explicitly identified this activity as skill development. No production AI engineering experience should be claimed until supported by a real project.

## ADR-011 — Education and Certifications gets a dedicated route

**Decision:** Add `/education` as a required route (updating `specs/02-architecture.md` §8), showing Education and Certifications as its own page rather than folding it into About or Experience.

**Reason:** `specs/08-implementation-backlog.md` already scoped prompt 023 as a dedicated "Education and Certifications page," but the architecture's routing list had not been updated to include it — a gap discovered while implementing that prompt. The user chose a dedicated route (consistent with every other content domain having its own page) over embedding it in an existing page.

## ADR-012 — Per-route SEO metadata deferred to client-side rendering only (MVP2 candidate: SSR/prerender)

**Decision:** Prompt 028 implements per-route document titles, meta descriptions, canonical links and Open Graph/Twitter tags entirely client-side, via a custom Angular Router `TitleStrategy` (`src/app/core/services/seo-title-strategy.ts`). The static `src/index.html` shell only carries the Home page's metadata. No Angular SSR or prerendering was introduced.

**Reason:** The architecture (`specs/02-architecture.md` §9) commits to a static, backend-free deployment on GitHub Pages, and SSR/prerendering was not in this prompt's scope. This keeps the fix small and consistent with the current architecture, but it means a crawler or link-unfurler (Slack, LinkedIn, Twitter/X, WhatsApp, etc.) that does not execute JavaScript will only ever see the Home page's title/description/OG tags, even when the shared link points to `/projects`, `/projects/:slug`, `/about`, and so on. Search engines that do execute JavaScript (Googlebot, Bing) are not affected.

**Follow-up for a future MVP2:** Evaluate Angular SSR/prerendering (`@angular/ssr` static prerendering, which can still deploy to GitHub Pages as a build step) so every route ships its own real HTML with correct metadata baked in, instead of relying on client-side `Title`/`Meta` updates after navigation. Revisit alongside `public/sitemap.xml`, which currently only lists static top-level routes and would need per-project entries if project detail pages are meant to be indexed individually.
