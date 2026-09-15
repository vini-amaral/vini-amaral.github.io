# Content Specification — Real Portfolio Content

## 1. Source of truth

The first content source is the user's LinkedIn export (`Profile.md`) and the user's postgraduate portfolio (`Portfolio.md`). The website must only display factual content supported by those sources unless the user explicitly approves new content.

The LinkedIn source establishes the professional profile, experience, education, certifications and languages. The postgraduate portfolio provides a deeper personal/professional narrative and a concrete example of competencies in action.

## 2. Content must be data-driven

All content displayed by the application must be stored outside Angular components in structured JSON files.

Recommended location:

```text
src/assets/data/
├── profile.json
├── about.json
├── experience.json
├── education.json
├── certifications.json
├── skills.json
├── languages.json
├── social-links.json
└── projects.json
```

Components must not contain hard-coded biography, experience, education, certification or project text.

## 3. Content domains

### Profile

Use:
- full name
- professional headline
- location
- professional summary
- contact references

The current LinkedIn headline is:
`Team Lead | Scrum Master | Tech Lead`

Do not replace this with a more marketable title without explicit approval.

### About

Create a substantial About section based on the postgraduate portfolio. The source supports the following themes:

- early interest in creating and technology
- programming as a way to transform ideas into useful solutions
- Systems Information background
- more than a decade in technology
- progression into management and leadership
- ability to connect people, technology, business and strategy
- systems thinking
- analysis and problem solving
- project coordination and management
- process management
- business intelligence
- requirements management
- experience with distributed and multicultural teams
- adaptability to different contexts
- communication and interpersonal relationship
- resilience
- planning and organization
- storytelling and communication of complex ideas
- collaboration and shared understanding

The About page should be structurally equivalent to an individual version of an organization's “about / history / values” area, but must remain factual and personal rather than corporate marketing copy.

The postgraduate portfolio contains a case describing an urgent international sales-channel initiative. This case may become an “Approach in practice” or “Case study” subsection, subject to the user's approval, and must preserve the source's distinction between Situation, Challenge, Action and Result.

### Experience

Represent employment and role history as structured entries. Preserve company, employment type, role, dates, location, description and technologies as separate fields.

Do not merge distinct roles merely to simplify the timeline. The LinkedIn source contains several role transitions inside Avanade and these are useful evidence of progression.

### Skills

Create skill groups rather than one unstructured technology list. Separate at least:
- Development
- Frameworks / web
- Databases
- Cloud / Microsoft ecosystem
- DevOps / delivery
- Quality / automation / BI
- Agile / leadership
- Business / analysis

Only classify a skill when the source supports it. Technology names may appear in multiple experience entries, but the global skill list should avoid artificial claims of proficiency level unless explicitly supplied by the user.

### Education

Represent each education entry with institution, degree/program, dates and description.

### Certifications

Represent each certification with name, issuer, issue date, expiration date when present, credential ID when present, and status derived from dates. Do not delete expired certifications from the data; mark them as expired so the UI can decide whether and how to display them.

### Languages

Preserve the stated levels exactly unless the user later changes them.

### Projects

No concrete portfolio projects were supplied in the LinkedIn or postgraduate portfolio files. Therefore `projects.json` must start with an empty `items` collection and a documented schema. Do not invent projects, repositories, deployments, metrics or screenshots.

Projects can be added later without changing the application architecture.

## 4. Content hierarchy

The home page should prioritize:

1. professional identity
2. concise value proposition
3. selected projects
4. core technical/leadership capabilities
5. career trajectory
6. deeper About narrative
7. contact/social links

The About page can contain considerably more narrative than the Home page.

## 5. Content tone

Professional, direct, human and technically credible.

Avoid:
- exaggerated claims
- generic AI-generated slogans
- comic/noir metaphors in substantive copy
- unsupported metrics
- invented impact statements
- corporate buzzword accumulation

Noir Comics is a visual treatment, not the voice of the content.

## 6. Language strategy

The initial content may be authored in Portuguese and/or English according to the user's final decision. The data model must support localized fields so that adding i18n later does not require restructuring the domain model.

Prefer:

```json
"title": {
  "pt-BR": "...",
  "en": "..."
}
```

for user-facing fields where multilingual support is required.

## 7. Data/API boundary

The UI must depend on typed content repositories/services rather than directly importing JSON from components.

Initial implementation:

`JSON files -> HttpClient -> Content Repository -> typed models -> components`

Future implementation:

`REST API -> HttpClient -> same Content Repository interface -> typed models -> components`

The components must not need to know whether content came from JSON or an API.

## 8. Source traceability

Where practical, content records should include internal metadata such as:

- `source`: `linkedin`, `portfolio`, `user`
- `sourceRef`: optional reference to the originating section/record
- `reviewStatus`: `draft`, `approved`

These fields are application metadata and should not be rendered publicly.

## 9. Known source inconsistencies

The LinkedIn export contains date/title combinations that should not be silently reconciled. In particular:

- Avanade Associate Manager is listed from June 2026 to present.
- Inside the Consultant entry, the Tech Lead | Scrum Master role is described as June 2024–Present, while the parent Consultant role ends in May 2026.

The data model should preserve the source dates and flag the second item for user review before publication.

## 10. Privacy

Only publish contact information and professional links the user explicitly intends to make public. Credential IDs should be treated as optional display data even when present in the source.
