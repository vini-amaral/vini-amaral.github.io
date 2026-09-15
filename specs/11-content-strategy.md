# Content Strategy — Positioning, Narrative and Information Hierarchy

## 1. Purpose

Define how the real professional content should be presented in the portfolio without turning the website into a copy of LinkedIn or a traditional CV.

The site is a professional software engineering portfolio. Noir Comics is the visual language only.

## 2. Professional positioning

### Recommended primary positioning

**Software Engineer & Tech Lead**

### Supporting positioning

**Team Lead | Scrum Master | Technical Leadership**

### Recommended Hero structure

The Hero should communicate three things immediately:

1. who Vinicius is;
2. what kind of professional he is today;
3. what evidence the visitor can explore.

Recommended content model:

- Name: `Vinicius Alves do Amaral`
- Primary title: `Software Engineer & Tech Lead`
- Supporting statement: `15 years in technology, connecting software engineering, people and business to build and evolve solutions.`
- Primary CTA: `View projects`
- Secondary CTA: `About me`
- Optional tertiary CTA: `LinkedIn`

Do not use a fictional slogan, comic catchphrase or exaggerated claim.

The existing LinkedIn headline remains a source datum (`Team Lead | Scrum Master | Tech Lead`) and should remain available in the profile data. The website may use the recommended positioning above as editorial presentation because the site's purpose is broader than reproducing the LinkedIn headline.

## 3. Home narrative: “Now, not résumé”

The Home should not reproduce the complete employment history.

The primary narrative is:

**Who I am → What I am building → What I know how to do → Where I came from → Where to learn more**

The Home should include a compact **Now** / **Currently** section driven by a dedicated JSON resource. This makes the page easy to maintain as priorities change.

The `Now` content should contain only current, short-lived highlights, such as:

- current professional role;
- current technical focus;
- current learning focus;
- current portfolio/project activity;
- current professional direction.

Do not put these changing statements inside Angular components.

## 4. Career presentation

Use a **career progression narrative** rather than a résumé dump.

The Home should show 3–4 high-level stages:

1. **Software development foundation** — development, maintenance and evolution of business-critical systems.
2. **Technical leadership** — technical leadership and responsibility for solution evolution.
3. **Team and delivery leadership** — Scrum Master / Team Lead responsibilities, quality and delivery governance.
4. **Current role** — Associate Manager with Tech Lead / Scrum Master responsibilities and technical governance.

These stages are editorial groupings. The detailed employment and role records remain in `experience.json` and the Experience page.

Do not invent titles or dates for the stages. The stage labels are summaries of the supplied experience data.

## 5. About narrative

The About page should be a substantial professional narrative adapted from the postgraduate portfolio, not a generic biography.

Recommended structure:

### 5.1 Origin

The early motivation to create and the discovery of programming as a way to transform ideas into useful solutions.

### 5.2 Building the foundation

Systems Information degree and the development of a broad technology foundation.

### 5.3 From technology to leadership

The progression from software development into technical leadership, project coordination, Scrum Master / Team Lead responsibilities and management.

### 5.4 Connecting perspectives

The central professional characteristic supported by the source: connecting people, technology, business and strategy.

### 5.5 How I work

Adaptability, communication, planning, resilience, requirements understanding, problem solving and storytelling.

### 5.6 Working across contexts

Experience with distributed and multicultural teams and the lesson that effective solutions depend on understanding context and people.

### 5.7 Approach in practice

Present the supplied real case using:

**Situation → Challenge → Action → Result → Learning**

The source case must remain faithful to the original facts and should not be expanded with invented metrics.

## 6. Competencies to emphasize

The site should prioritize competencies that are supported by both the professional history and the postgraduate portfolio.

### Engineering and technology

- Software development
- Solution analysis and implementation
- .NET ecosystem
- Angular
- SQL Server / relational databases
- Azure / Microsoft ecosystem
- Technical governance
- Code quality
- Application evolution and legacy modernization
- Requirements analysis
- Problem solving

### Delivery and leadership

- Technical leadership
- Team leadership
- Scrum Master / agile facilitation
- Project coordination
- Planning and prioritization
- Risk and delivery management
- Quality management
- Cross-functional collaboration

### Business and systems thinking

- Connecting technology, business and strategy
- Process analysis
- Business Intelligence / data-informed decisions
- Understanding business needs
- Translating business needs into technical solutions

### Human and communication capabilities

- Communication
- Interpersonal relationships
- Adaptability
- Resilience
- Storytelling / communication of complex ideas
- Collaboration across distributed and multicultural teams

### AI — current development focus

The portfolio itself is evidence that Vinicius is actively developing AI-assisted software development skills through agent-based, specification-driven development.

This must be presented as an **ongoing learning/practice area**, not as an unsupported claim of AI expertise.

Recommended label:

`AI-assisted software development & agentic workflows`

Recommended status:

`Developing / current focus`

Do not claim production AI engineering experience unless a real project is later added to the project data.

## 7. Projects

The project portfolio must use four editable example records initially:

- Example 1
- Example 2
- Example 3
- Example 4

These are placeholders, not fictional case studies.

Each record should clearly expose its status as `placeholder` or `draft` so the UI can avoid presenting invented information as completed work.

When real projects are supplied, replace the JSON records without changing the component architecture.

## 8. Home vs internal pages

### Home

Home is the editorial summary and current snapshot.

Include:

- Hero
- Current / Now highlights
- Selected projects
- Core capabilities
- Compact career progression
- Short About teaser
- Contact / social CTA

### Projects

Detailed case studies with:

- problem
- context
- solution
- role
- architecture / engineering decisions
- technologies
- outcome / evidence
- live deployment
- repository

Only show fields for which real information exists.

### Experience

Detailed professional history, including employer and role progression.

### Skills

Structured technical and professional capabilities, grouped and supported by evidence.

### About

Long-form personal/professional narrative and the real case demonstrating the working approach.

### Contact

Direct contact channels and professional networks.

## 9. 2026 portfolio principles

The content strategy should follow current portfolio patterns without blindly following trends:

- show evidence rather than only claims;
- make projects explain how the engineer thinks, not only what technologies were used;
- keep the first screen immediately understandable;
- use a concise current-state section rather than making the Home a résumé;
- use structured metadata so the site is understandable to both humans and machine-based discovery systems;
- favor restrained motion and performance over decorative effects;
- preserve strong accessibility and fast loading.

The Noir visual system should remain distinctive while the information architecture stays conventional and easy to scan.
