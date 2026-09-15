# Checkpoint Protocol

Every implementation prompt is a checkpoint.

## Developer workflow

1. Read the prompt.
2. Ensure the repository is clean or its current state is understood.
3. Give only the current prompt to the coding agent.
4. Let the agent implement the task.
5. Review the completion report.
6. Run validation yourself when practical.
7. Open the application and inspect the affected area.
8. If incorrect, fix it before moving on.
9. Commit the change if using Git.
10. Execute the next prompt.

## Suggested Git strategy

Prefer one commit per completed prompt:

```text
001 create Angular baseline
002 configure Tailwind
003 configure GitHub Pages
...
```

This makes it easy to identify and revert the exact step that introduced a problem.

## Never skip a broken checkpoint

Do not continue building new features on top of a broken checkpoint unless the issue is explicitly understood and intentionally accepted.
