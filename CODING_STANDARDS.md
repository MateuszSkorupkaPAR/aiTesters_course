# Coding Standards

Playwright tests live in [tests/](tests). Page Objects live in [src/pages/](src/pages).
[RegisterPage](src/pages/register-page.ts) is the reference implementation.

This file is the source of truth for how tests and Page Objects are written.
Agent workflow (Playwright config, commits, and test tags) lives in
[.github/agents.md](.github/agents.md).

## Page Objects

A Page Object models one page. It exposes locators and user actions. It does not decide
whether a test passed.

### Do not assert inside Page Objects

- Never import or call `expect` from a Page Object.
- Never add methods such as `expectLoaded()`, `verifySuccess()`, or `assertVisible()`.
- Keep every verification in the test file, inside the `// Assert` section.

```ts
// Page Object — action only
async register(email: string, password: string, displayName?: string) {
  await this.fillRegistrationForm(email, password, displayName);
  await this.submit();
}

// Test — verification stays here
await registerPage.register(email, "TestPass123", "Copilot Tester");
await expect(registerPage.successBanner).toBeVisible();
```

### What belongs in a Page Object

- One class per page, named `<Name>Page` (for example `RegisterPage`).
- A constructor that takes Playwright's `Page` and stores locators as `readonly` fields.
- Prefer `page.getByTestId(...)`. Use a role, text, or CSS locator only when no test id exists,
  and leave a short comment explaining why.
- Action methods that navigate, fill, click, or combine those steps (`goto`, `submit`,
  `register`). Methods should return `void` or a value the test needs, not a pass/fail result.
- Composite actions may call smaller actions. They must not hide checks.

### What stays out

- `expect` calls and any other pass/fail logic.
- Test data builders (use [src/helpers/](src/helpers) instead).
- Assertions copied into helpers just to share them. If two tests need the same check, repeat
  the `expect` or extract a test helper — not a Page Object method.

## Tests

Structure every test body with Arrange–Act–Assert. Mark each section with a `// Arrange`,
`// Act`, or `// Assert` comment. Omit a section only when the test genuinely has nothing
to put there (for example, a pure page-load check has no separate Arrange step).

1. **Arrange**: create the Page Object and reach the starting state (`new RegisterPage(page)`,
   `goto()`). Fixtures, variables, and `test.setTimeout` also belong here.
2. **Act**: call Page Object actions for the single behavior under test. Do not reach into
   raw selectors when the page already exposes that locator or action.
3. **Assert**: call `expect` on the Page Object's public locators, or on `page` for URL and
   title. All verifications stay in the test file.
