# vini-amaral.github.io — Spec Package

This directory contains the specifications and structured content inputs for an AI-agent-driven, spec-driven development workflow for Vinicius Alves do Amaral's developer/software engineer portfolio.

## Start here

1. `00-project-overview.md` — project context and principles
2. `01-product-spec.md` — product/page behavior
3. `02-architecture.md` — Angular/Tailwind architecture and JSON/API boundary
4. `03-visual-design-spec.md` — Noir Comics visual system
5. `04-content-spec.md` — rules for real professional content
6. `10-content-data-model.md` — JSON/domain contract and future API migration
7. `05-requirements.md` — functional/non-functional requirements
8. `06-agent-rules.md` — non-negotiable rules for AI agents
9. `07-development-workflow.md` — SDD workflow
10. `08-implementation-backlog.md` — implementation tasks
11. `09-decision-log.md` — architectural decisions

## Structured content

The `data/` directory contains the initial content layer:

- `profile.json`
- `about.json`
- `experience.json`
- `education.json`
- `certifications.json`
- `skills.json`
- `languages.json`
- `social-links.json`
- `projects.json`

The JSON is intentionally separate from Angular components. The UI should consume typed repositories, allowing the source to move from static JSON to an API later without rewriting feature components.

## Content status

LinkedIn-derived factual records are marked `approved` where they can be represented directly. Narrative content derived from the postgraduate portfolio is marked `draft` because the user explicitly intends to adapt the tone later.

Projects are intentionally empty because neither supplied source contains the concrete project/deploy/repository information required to publish a project case study.

## Important review item

The LinkedIn export contains a date inconsistency around the Consultant / Tech Lead | Scrum Master period at Avanade. It is preserved and flagged rather than silently corrected.

## Content strategy

The current editorial strategy is documented in `11-content-strategy.md`.

The Home uses `data/home-highlights.json` for frequently changing information. Projects are represented by four explicit editable placeholders in `data/projects.json` until real projects are supplied.
