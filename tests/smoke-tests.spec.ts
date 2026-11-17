import { expect, test } from "@playwright/test";

test("has title", { tag: ["@smoke"] }, async ({ page }) => {
  // Act
  await page.goto("/");

  // Assert
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Rolnopol/);
});

test("login link", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  // Arrange
  await page.goto("/");

  // Act
  // Click the login link.
  await page.getByRole("link", { name: "Login" }).click();

  // Assert
  // Expects page to navigate to the login page.
  await expect(page).toHaveURL(/login\.html/);
  await expect(page).toHaveTitle(/Login - Rolnopol/);
});

test.describe("Login page", () => {
  test(
    "loads and displays the login form",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      // Act
      await page.goto("/login.html");

      // Assert
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
      // Arrange
      const expectedSubtitle = "User Login & Account Access";

      // Act
      await page.goto("/login.html");

      // Assert
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
      // Act
      await page.goto("/register.html");

      // Assert
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
      // Arrange
      const expectedSubtitle = "Create Your User Account";

      // Act
      await page.goto("/register.html");

      // Assert
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

test.describe("Registration", () => {
  test(
    "registers a new user successfully",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      // The post-registration redirect can take a while, so extend the test timeout.
      test.setTimeout(35 * 1000);

      // Arrange
      // Unique email avoids clashing with previously registered accounts.
      const uniqueEmail = `copilot.test.${Date.now()}@example.com`;
      await page.goto("/register.html");
      await page.getByTestId("email-input").fill(uniqueEmail);
      await page.getByTestId("display-name-input").fill("Copilot Tester");
      await page.getByTestId("password-input").fill("TestPass123");

      // Act
      await page.getByTestId("register-submit-btn").click();

      // Assert
      // A success notification banner confirms the registration succeeded.
      // No data-testid is exposed for this toast, so its CSS classes are used instead.
      const successBanner = page.locator(".notification.success");
      await expect(successBanner).toBeVisible();
      await expect(successBanner).toContainText("Registration successful!");

      // A successful registration redirects the user to the login page.
      await expect(page).toHaveURL(/login\.html/, { timeout: 30 * 1000 });
      await expect(page).toHaveTitle(/Login - Rolnopol/);
    },
  );
});

test.describe("Documentation page", () => {
  test(
    "loads and displays the documentation content",
    { tag: ["@smoke"] },
    async ({ page }) => {
      // Act
      await page.goto("/docs.html");

      // Assert
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
      // Act
      await page.goto("/swagger.html");

      // Assert
      // Page loaded with correct title.
      await expect(page).toHaveTitle(/Rolnopol - Swagger/);

      // The embedded Swagger UI frame is visible.
      // No data-testid is exposed for this page, so the frame id is used instead.
      await expect(page.locator("#swagger-frame")).toBeVisible();
    },
  );
});
