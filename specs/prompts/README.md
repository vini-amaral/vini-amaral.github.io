# Agent Prompts

These prompts are intentionally atomic and must be executed in numerical order.

## Workflow

`001` → validate → intervene/fix if needed → `002` → validate → ...

Keep the entire `specs/` directory available to the coding agent, but give it only the current prompt as the task to execute.

If a prompt produces an incorrect result, stop the sequence and fix the current state before continuing.

## Why this exists

Small, independently verifiable change sets reduce hallucinations, architectural drift and visual regressions, and make it clear which step introduced a problem.
