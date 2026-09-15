# Content Data Model and JSON Contract

## 1. Purpose

Define the structured content contract used by the portfolio. The contract must work as static JSON today and as API resources in the future.

## 2. General collection envelope

Collections use:

```json
{
  "version": 1,
  "items": []
}
```

Single-resource documents use:

```json
{
  "version": 1,
  "data": {}
}
```

## 3. Identifiers

Every persistent record gets a stable machine-readable `id`.

Examples:

- `avanade`
- `b2sys`
- `software-quality-lead`
- `information-systems-bachelor`

Do not use display names as foreign keys.

## 4. Dates

Store dates as ISO strings:

`YYYY-MM-DD`

For ongoing entries use `endDate: null`.

The UI formats dates according to locale.

## 5. Localization

User-facing fields that may require translation should use localized objects:

```json
{
  "pt-BR": "Texto em português",
  "en": "English text"
}
```

Machine-readable fields such as IDs, dates, URLs and technology IDs are not localized.

## 6. Profile schema

```json
{
  "version": 1,
  "data": {
    "id": "vinicius-alves-do-amaral",
    "name": "Vinicius Alves do Amaral",
    "headline": "Team Lead | Scrum Master | Tech Lead",
    "location": "São Paulo, São Paulo, Brasil",
    "summary": {},
    "source": "linkedin",
    "reviewStatus": "approved"
  }
}
```

## 7. Experience schema

An experience record represents an employer. Roles are nested so career progression remains explicit.

```json
{
  "id": "avanade",
  "company": "Avanade",
  "employmentType": "full-time",
  "startDate": "2011-05-01",
  "endDate": null,
  "roles": [
    {
      "id": "avanade-associate-manager",
      "title": "Associate Manager",
      "startDate": "2026-06-01",
      "endDate": null,
      "location": "São Paulo, Brasil",
      "workMode": "remote",
      "specialty": "Tech Lead | Scrum Master",
      "description": {},
      "technologies": ["copilot", "dotnet", "angular", "azure-devops", "oracle", "sql-server"],
      "source": "linkedin",
      "reviewStatus": "approved"
    }
  ]
}
```

The `company.startDate` and `company.endDate` values should be based on the employment record, not inferred from role dates if source data is ambiguous. If necessary, keep only role dates and omit inferred company dates.

## 8. Project schema

```json
{
  "id": "project-id",
  "slug": "project-slug",
  "title": {},
  "summary": {},
  "problem": {},
  "solution": {},
  "role": {},
  "technologies": [],
  "links": {
    "live": null,
    "repository": null
  },
  "image": null,
  "featured": false,
  "status": "draft",
  "source": "user",
  "reviewStatus": "draft"
}
```

## 9. Skills schema

```json
{
  "id": "development",
  "name": {},
  "items": [
    {
      "id": "dotnet",
      "name": ".NET",
      "icon": "",
      "evidence": ["experience"]
    }
  ]
}
```

Do not assign proficiency levels unless the user supplies them.

## 10. About schema

The About content supports sections so the long-form narrative can evolve without changing the page component.

```json
{
  "version": 1,
  "data": {
    "intro": {},
    "sections": [
      {
        "id": "origin",
        "title": {},
        "body": []
      }
    ],
    "caseStudy": {
      "enabled": true,
      "situation": {},
      "challenge": {},
      "action": {},
      "result": {},
      "learning": {}
    }
  }
}
```

## 11. API migration rule

A future API should return the same domain shape, or an adapter should map the API contract to these domain models.

Do not couple UI components to backend-specific response metadata.

Recommended future endpoints:

```text
GET /api/profile
GET /api/about
GET /api/experience
GET /api/projects
GET /api/skills
GET /api/education
GET /api/certifications
GET /api/languages
GET /api/social-links
```

These are conceptual contracts only. No backend is part of the current project.

## 12. Home highlights schema

Home highlights are intentionally separated from long-lived profile data.

```json
{
  "version": 1,
  "data": {
    "updatedAt": "2026-09-14",
    "items": [
      {
        "id": "current-role",
        "type": "professional",
        "label": {},
        "title": {},
        "description": {},
        "source": "linkedin",
        "reviewStatus": "approved"
      }
    ]
  }
}
```

Recommended `type` values:

- `professional`
- `learning`
- `project`
- `availability`
- `publication`

This is an editorial resource, not a replacement for the normalized domain resources.

## 13. Project placeholder rule

The initial `projects.json` contains four explicit placeholders: `example-1` through `example-4`.

They must never be presented as real projects. The UI should render a clear placeholder state until the records are replaced by approved project data.
