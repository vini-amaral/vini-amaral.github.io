# Visual Design Specification — Noir Comics Adaptation

## 1. Design principle

The visual system should feel like a **professional software portfolio rendered through a Noir Comics lens**.

The design must communicate:

- precision
- technical maturity
- confidence
- restraint
- personality

It must not communicate crime, violence, danger or fictional detective storytelling as the site's actual subject matter.

## 2. Color system

### Dark theme

Base:
- near-black / black surfaces
- white / off-white typography
- saturated red as the single accent

### Light theme

Base:
- warm white / very light neutral surfaces
- near-black typography
- the same red accent

The red should be used intentionally for:

- primary CTAs
- active navigation state
- important links
- small visual markers
- selected highlights

Do not flood entire sections with red.

## 3. Chiaroscuro

Use large areas of strong light and shadow, but preserve text readability.

Acceptable treatments:

- high-contrast section backgrounds
- hard-edged shadows
- strong borders
- selective silhouette imagery
- diagonal light patterns as decoration
- subtle halftone / ink textures

Avoid noisy textures behind body text.

## 4. Typography

Typography must prioritize readability.

Use a maximum of two type families:

- primary UI/body family
- optional display family for major headings

Headings may be angular or condensed if legibility remains strong.

Do not use a comic-style novelty font for paragraphs, navigation or technical content.

## 5. Layout

Use a strong editorial grid.

Characteristics:

- generous negative space
- asymmetric accents
- hard rectangular cards
- occasional diagonal separators
- strong alignment
- clear vertical rhythm

Avoid making every section asymmetrical. Asymmetry is an accent, not the layout's foundation.

## 6. Project cards

Project cards are evidence containers, not comic panels.

They may use:

- thick borders
- offset shadows
- monochrome image treatment
- red accent marker
- angular decorative corner

But the project title, problem and solution must remain immediately readable.

## 7. Motion

Animation must be subtle and purposeful.

Allowed:

- hover elevation / border transition
- reveal on navigation where useful
- theme transition
- very subtle decorative movement

Not allowed by default:

- constant background animation
- excessive parallax
- flashing effects
- animation required to understand content

Respect `prefers-reduced-motion`.

## 8. Imagery placeholders

Where an image would improve the design, create an explicit placeholder component or asset slot.

Do not generate fake professional photographs, fake screenshots, fake project dashboards or fake company imagery.

Suggested placeholder labels:

- `PROFILE_IMAGE_PLACEHOLDER`
- `PROJECT_IMAGE_PLACEHOLDER`
- `PROJECT_SCREENSHOT_PLACEHOLDER`

## 9. Icons

Use Font Awesome SVG icons.

Icons must support meaning rather than decorate every piece of text.

Always provide accessible labels for icon-only controls.

## 10. Theme system

Implement light and dark themes using semantic design tokens.

Components must not hard-code assumptions such as `bg-black` everywhere if doing so prevents coherent light-theme behavior.

Prefer semantic classes/tokens for surfaces, text, borders and accents.

Persist the user's theme choice locally if this can be implemented without unnecessary complexity.

Respect the operating-system preference on first visit when no explicit user preference exists.
