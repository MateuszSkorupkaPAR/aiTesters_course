import { expect, test } from "@playwright/test";

test("has title", { tag: ["@smoke"] }, async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Rolnopol/);
});

test("login link", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  await page.goto("/");

  // Click the login link.
  await page.getByRole("link", { name: "Login" }).click();

  // Expects page to navigate to the login page.
  await expect(page).toHaveURL(/login\.html/);
  await expect(page).toHaveTitle(/Login - Rolnopol/);
});

test.describe("Login page", () => {
  test(
    "loads and displays the login form",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      await page.goto("/login.html");

      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Login - Rolnopol/);

      // Core elements are visible.
      await expect(page.getByTestId("login-container")).toBeVisible();
      await expect(page.getByTestId("login-form")).toBeVisible();
      await expect(page.getByTestId("email-input")).toBeVisible();
      await expect(page.getByTestId("password-input")).toBeVisible();
      await expect(page.getByTestId("login-submit-btn")).toBeVisible();
      await expect(page.getByTestId("register-link")).toBeVisible();
    },
  );
});

test.describe("Login page subtitle", () => {
  test(
    "loads and displays the login subtitle",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      const expectedSubtitle = "User Login & Account Access";

      await page.goto("/login.html");

      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Login - Rolnopol/);

      // Subtitle element is visible with the expected text.
      await expect(page.getByTestId("login-subtitle")).toBeVisible();
      await expect(page.getByTestId("login-subtitle")).toHaveText(
        expectedSubtitle,
      );
    },
  );
});

test.describe("Register page", () => {
  test(
    "loads and displays the registration form",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      await page.goto("/register.html");

      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Register - Rolnopol/);

      // Core elements are visible.
      await expect(page.getByTestId("register-container")).toBeVisible();
      await expect(page.getByTestId("register-form")).toBeVisible();
      await expect(page.getByTestId("email-input")).toBeVisible();
      await expect(page.getByTestId("display-name-input")).toBeVisible();
      await expect(page.getByTestId("password-input")).toBeVisible();
      await expect(page.getByTestId("register-submit-btn")).toBeVisible();
      await expect(page.getByTestId("login-link")).toBeVisible();
    },
  );
});

test.describe("Register page subtitle", () => {
  test(
    "loads and displays the registration subtitle",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      const expectedSubtitle = "Create Your User Account";

      await page.goto("/register.html");

      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Register - Rolnopol/);

      // Subtitle element is visible with the expected text.
      await expect(page.getByTestId("register-subtitle")).toBeVisible();
      await expect(page.getByTestId("register-subtitle")).toHaveText(
        expectedSubtitle,
      );
    },
  );
});

test.describe("Documentation page", () => {
  test(
    "loads and displays the documentation content",
    { tag: ["@smoke"] },
    async ({ page }) => {
      await page.goto("/docs.html");

      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Documentation - Rolnopol/);

      // Core elements are visible.
      await expect(page.getByTestId("docs-container")).toBeVisible();
      await expect(page.getByTestId("docs-header")).toBeVisible();
      await expect(page.getByTestId("docs-sidebar")).toBeVisible();
      await expect(page.getByTestId("docs-nav")).toBeVisible();
      await expect(page.getByTestId("docs-content")).toBeVisible();
    },
  );
});

test.describe("Swagger page", () => {
  test(
    "loads and displays the API documentation frame",
    { tag: ["@smoke"] },
    async ({ page }) => {
      await page.goto("/swagger.html");

      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Rolnopol - Swagger/);

      // The embedded Swagger UI frame is visible.
      // No data-testid is exposed for this page, so the frame id is used instead.
      await expect(page.locator("#swagger-frame")).toBeVisible();
    },
  );
});
