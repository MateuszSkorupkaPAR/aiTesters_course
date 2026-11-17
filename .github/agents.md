# Testing Framework

This project uses the [Playwright Test](https://playwright.dev/docs/intro) framework for
end-to-end tests. Review [playwright.config.ts](/playwright.config.ts) before creating or
modifying tests to stay consistent with the configured `testDir`, timeout, reporter,
`use` options (e.g. `baseURL`, `trace`), and `projects`.

# Test Structure

Structure every test body using the Arrange-Act-Assert pattern:

- **Arrange**: set up test data and preconditions (e.g. fixtures, variables, `test.setTimeout`,
  navigation needed only to reach the starting state).
- **Act**: perform the single action under test (e.g. `page.goto`, a click, a form submission).
- **Assert**: verify the expected outcome with `expect` calls.

Mark each section with a `// Arrange`, `// Act`, or `// Assert` comment. Omit a section only
when the test genuinely has nothing to put there (e.g. a pure page-load check has no separate
Arrange step).

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
