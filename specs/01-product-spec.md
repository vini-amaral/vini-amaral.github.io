# Product Specification

## 1. Positioning

The site presents Vinicius as a software developer / software engineer through evidence: professional experience, technical stack, projects and engineering decisions.

The visual language is inspired by **Noir Comics**, adapted to a professional technology portfolio.

## 2. Information architecture

The initial site should contain:

- Home
- Projects
- Project detail pages
- Experience
- Skills / Tech Stack
- About / Profile
- Contact
- Custom 404

The exact navigation labels may be adjusted during implementation, but the information architecture must remain discoverable and shallow.

## 3. Home page

The home page should contain, in this order unless UX testing indicates a better hierarchy:

1. Header / navigation
2. Hero
3. Short professional positioning
4. Selected projects
5. Technical stack
6. Experience summary
7. Contact CTA
8. Footer

### Hero requirements

Must communicate:

- name
- professional title / specialization
- concise value proposition
- primary CTA: contact or projects
- secondary CTA: curriculum, when a real CV file is supplied
- optional profile image placeholder

Do not create a fictional slogan. The wording must come from approved portfolio content.

## 4. Projects

Show 3–4 selected projects on the home page.

Each project must support:

- title
- short description
- problem
- solution
- role
- technologies
- relevant engineering decisions
- outcome / evidence, when available
- live deployment link, when available
- source repository link, when available
- optional image / screenshot placeholder

A project without enough factual information must use an explicit placeholder rather than invented content.

## 5. Experience

Use a concise chronological presentation.

Each entry should support:

- organization
- role
- period
- location / remote status, only if relevant
- short responsibility summary
- measurable outcomes, only when verified
- technologies / domains, when relevant

## 6. Skills

Group skills instead of presenting a single undifferentiated wall of logos.

Suggested groups:

- Languages
- Backend / APIs
- Frontend
- Databases
- Cloud / DevOps
- Testing
- Architecture / Engineering
- Tools

Only list technologies that are actually supported by the content source supplied to the implementation agent.

## 7. Contact

Provide direct access to:

- GitHub
- LinkedIn
- email
- optional CV download

A contact form is optional. Because the initial deployment is static, prefer a direct email CTA unless a concrete form provider is specified later.

## 8. 404

Create a custom 404 page consistent with the visual system, but keep the message professional. Noir references may be used as visual metaphor only.

Required CTA: return to Home.

## 9. Accessibility

The site must:

- maintain readable contrast in both themes
- support keyboard navigation
- expose visible focus states
- use semantic HTML
- provide meaningful accessible names for icon-only controls
- respect `prefers-reduced-motion`
- provide alt text for meaningful images
- avoid communicating information through color alone

## 10. Responsive behavior

Design mobile-first.

Breakpoints must be selected from layout needs rather than arbitrary device targets.

The mobile version must not simply shrink the desktop composition. Navigation, cards, typography and decorative Noir elements must reflow naturally.

## 11. Current-state Home section

The Home must include a compact `Now` / `Currently` section between the Hero and the project/capability content.

Its content comes exclusively from `home-highlights.json`.

This section is intended for information that changes more frequently than the stable professional profile, such as current role, current learning focus and active portfolio work.

The page must not hard-code these highlights.

## 12. Career narrative instead of résumé duplication

The Home should summarize career progression through a small number of editorial stages. The detailed role history belongs to the Experience page.

The goal is to communicate professional evolution in seconds while giving visitors a clear path to the complete history.
