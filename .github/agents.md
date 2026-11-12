# Testing Framework

This project uses the [Playwright Test](https://playwright.dev/docs/intro) framework for
end-to-end tests. Review [playwright.config.ts](/playwright.config.ts) before creating or
modifying tests to stay consistent with the configured `testDir`, timeout, reporter,
`use` options (e.g. `baseURL`, `trace`), and `projects`.

# Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<optional scope>): <description>`

- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `build`, `ci`, `chore`, `revert`
- Write the description in lowercase, imperative mood, no trailing period, max 72 characters.
- Add a body (after a blank line) only when the "why" needs explaining.
- Mark breaking changes with `!` (e.g. `feat!: ...`) or a `BREAKING CHANGE:` footer.
- One logical change per commit.
- End AI-authored commits with: `Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>`

Examples:

```
feat(tests): add login validation scenarios
fix(playwright): correct base URL in config
chore: update VSCode settings
```

# Test Tags

Every Playwright test must declare at least one tag from the Tag Legend in
[TEST_PLAN.md](/TEST_PLAN.md), passed via the test's `tag` option, e.g.
`test('...', { tag: ['@smoke', '@auth'] }, async ({ page }) => { ... })`.

- Reuse existing tags from the Tag Legend whenever a scenario fits one.
- If a test needs a tag that doesn't exist yet, add it to the Tag Legend table in
  [TEST_PLAN.md](/TEST_PLAN.md) in the same change, with a short description.
- When adding/renaming/removing tags or key scenarios, keep [TEST_PLAN.md](/TEST_PLAN.md)
  (Tag Legend and Key Scenarios sections) in sync with the actual tests under
  [tests/](/tests).
