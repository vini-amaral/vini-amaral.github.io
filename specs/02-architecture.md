# Architecture Specification

## 1. Technology baseline

- Angular 21 LTS
- TypeScript
- Tailwind CSS
- Font Awesome SVG icons
- Angular Router
- Static deployment to GitHub Pages

Keep the Angular version explicit and upgrade deliberately rather than following unverified “latest” versions automatically.

## 2. Application model

Use modern Angular standalone components.

Avoid:

- unnecessary NgModules
- unnecessary global state
- services that only wrap constants
- premature abstractions

## 3. Source structure

```text
src/
├── app/
│   ├── core/
│   │   ├── layout/
│   │   ├── models/
│   │   ├── repositories/
│   │   └── services/
│   ├── shared/
│   │   ├── components/
│   │   └── ui/
│   ├── features/
│   │   ├── home/
│   │   ├── projects/
│   │   ├── experience/
│   │   ├── skills/
│   │   ├── education/
│   │   ├── about/
│   │   ├── contact/
│   │   └── not-found/
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── assets/
│   ├── data/
│   ├── images/
│   └── documents/
├── styles.css
└── index.html
```

## 4. Structured content architecture

The website content is a small domain model, not a collection of arbitrary JSON blobs.

Required domain models:

- `Profile`
- `AboutContent`
- `ExperienceEntry`
- `Role`
- `Project`
- `SkillGroup`
- `Skill`
- `EducationEntry`
- `Certification`
- `Language`
- `SocialLink`

Use TypeScript interfaces/types that mirror the JSON contracts.

## 5. JSON as the initial persistence/read layer

JSON files are the initial source of portfolio content because they are:

- easy to edit
- version-controlled
- deployable as static assets
- independent from presentation components
- suitable for later migration to structured persistence

Do not import JSON directly into page components as the primary architecture.

Preferred flow:

```text
/assets/data/*.json
        ↓
HttpClient
        ↓
Repository interface
        ↓
Typed domain models
        ↓
Feature components
        ↓
UI
```

## 6. API-ready repository boundary

Create repository interfaces such as:

```text
ProfileRepository
ExperienceRepository
ProjectRepository
SkillRepository
EducationRepository
CertificationRepository
AboutRepository
```

The first implementation can be `JsonContentRepository` or a unified `StaticContentRepository` that reads the JSON files with `HttpClient`.

A future implementation can be `ApiContentRepository` using the same interfaces.

Feature components must depend on repository contracts, not on `HttpClient`, URL paths or JSON files.

Example conceptual dependency:

```text
HomeComponent
    ↓
PortfolioContentService / repositories
    ↓
Repository interface
    ↓
Json implementation (now)
Api implementation (future)
```

The migration to an API should therefore primarily replace the repository implementation and configuration, not rewrite the UI.

## 7. API contract considerations

JSON structures should resemble future API response resources. Use stable IDs and machine-readable slugs.

Every major collection should have:

```json
{
  "version": 1,
  "items": []
}
```

Individual records should have stable `id` values.

Use ISO dates (`YYYY-MM-DD`) for machine-readable dates. Display formatting belongs to the UI.

Do not store presentation-specific strings such as “15 years ago” or “4 months”.

## 8. Routing

Required routes:

- `/` → Home
- `/projects` → Projects index
- `/projects/:slug` → Project detail
- `/experience` → Experience
- `/skills` → Skills
- `/education` → Education and Certifications
- `/about` → About
- `/contact` → Contact
- `**` → custom 404

Use lazy loading where useful.

## 9. GitHub Pages

The application is static and must not require a backend for its initial deployment.

The deployment configuration must support the repository/project URL and direct navigation to nested routes as far as GitHub Pages permits. Document the chosen strategy and test refresh/direct access on nested routes.

## 10. Themes

Implement semantic design tokens for light and dark themes. Content and components must remain theme-independent.

## 11. Testing

At minimum:

- production build
- linting if configured
- unit tests for non-trivial logic
- route smoke tests where practical
- accessibility checks for shared components
- content loading tests for repository layer

Static JSON content itself does not require artificial tests for every field.

## 9. Current-state content resource

Add `home-highlights.json` as a separate content resource.

Reason: Home highlights are intentionally short-lived and should be editable without touching profile, experience or project records.

Initial repository contract should expose:

```text
getProfile()
getHomeHighlights()
getAbout()
getExperience()
getProjects()
getSkills()
getEducation()
getCertifications()
getLanguages()
getSocialLinks()
```

A future API can expose equivalent resources without changing the Home component.
