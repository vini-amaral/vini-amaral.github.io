# Functional and Non-Functional Requirements

## Functional requirements

### FR-001 Navigation

The visitor can navigate between all public sections through the main navigation.

### FR-002 Home

The home page presents the professional profile, selected projects, technical stack, experience summary and contact CTA.

### FR-003 Project index

The visitor can browse all published projects.

### FR-004 Project detail

Each published project has a dedicated route and displays its approved content.

### FR-005 External project links

When supplied, live deployment and GitHub repository links are visible and open safely in a new context where appropriate.

### FR-006 Theme switching

The visitor can switch between light and dark themes.

### FR-007 Theme persistence

The selected theme is preserved across visits when local storage is available.

### FR-008 Experience

The visitor can view professional experience in chronological order.

### FR-009 Skills

The visitor can view grouped technical skills.

### FR-010 Contact

The visitor can access GitHub, LinkedIn and email through direct links.

### FR-011 404

Unknown routes display a custom 404 page with a Home CTA.

### FR-012 Responsive layout

All public routes remain usable from small mobile screens through large desktop screens.

## Non-functional requirements

### NFR-001 Accessibility

Target WCAG 2.2 AA where applicable.

### NFR-002 Performance

Avoid unnecessary JavaScript and large assets. The site should feel fast on normal mobile connections.

### NFR-003 Maintainability

Content must be separated from presentation.

### NFR-004 Consistency

Shared components must be used for recurring UI patterns.

### NFR-005 SEO

Each public page should have an appropriate title and description. Use semantic headings and canonical metadata where appropriate for a static portfolio.

### NFR-006 Security

No secrets, API keys or private data may be committed to the repository.

### NFR-007 Static hosting

The production build must be deployable to GitHub Pages without a backend.

### NFR-008 Progressive enhancement

Core content must remain understandable without decorative effects or animation.
