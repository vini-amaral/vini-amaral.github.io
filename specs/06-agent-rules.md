# Agent Rules

## Core principle

This project follows **spec-driven development with incremental, independently verifiable changes**.

The agent must treat the specification files as the source of truth and must execute only the explicitly requested task.

## Scope discipline

- Do not implement future phases.
- Do not add features because they appear useful or obvious.
- Do not refactor unrelated code.
- Do not silently change architectural decisions documented in the specs.
- Do not invent professional facts, projects, metrics, employers, technologies, achievements, testimonials, links, or other content.
- When required information is missing, use an explicit placeholder or stop and report the gap.
- Preserve the separation between content/data and presentation.
- Keep editable content in structured JSON whenever appropriate.

## One task, one change set, one validation

For every prompt:
1. Read the relevant specification files.
2. Confirm the current project state.
3. Implement only the requested scope.
4. Avoid modifying files outside the declared scope unless technically necessary.
5. Run the requested validation.
6. Report what changed and any issue found.
7. Stop.

The agent must **not continue automatically to another prompt**.

## Required completion report

After every task, report:
- Files created.
- Files modified.
- Files deleted, if any.
- What was implemented.
- Validation performed and result.
- Decisions or assumptions.
- Known limitations or pending issues.
- Whether the task is ready for the next prompt.

## Content integrity

The JSON files are the authoritative editable content source for the current static implementation.

Do not duplicate editable content unnecessarily inside Angular components.

Do not turn placeholders such as `Example 1` into fictional real projects.

## Architecture integrity

UI components must depend on domain/application models and a content-access abstraction, not directly on a storage mechanism.

The initial implementation may use local JSON. The architecture must permit replacing that implementation with an HTTP/API implementation later without changing page components.

## Visual integrity

The Noir Comics aesthetic is a visual language, not a narrative gimmick. Do not introduce fictional detective, crime, investigation, gangster, or comic-book storytelling into professional content.

## Stop condition

When the requested task and validation are complete, stop and wait for the next instruction.
