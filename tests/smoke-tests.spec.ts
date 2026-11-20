import { expect, test } from "@playwright/test";
import { uniqueEmail } from "../src/helpers/unique-email";
import { DocsPage } from "../src/pages/docs-page";
import { HomePage } from "../src/pages/home-page";
import { LoginPage } from "../src/pages/login-page";
import { RegisterPage } from "../src/pages/register-page";
import { SwaggerPage } from "../src/pages/swagger-page";

test("has title", { tag: ["@smoke"] }, async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);

  // Act
  await homePage.goto();

  // Assert
  await expect(page).toHaveTitle(/Rolnopol/);
});

test("login link", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  // Arrange
  const homePage = new HomePage(page);
  await homePage.goto();

  // Act
  await homePage.clickLoginLink();

  // Assert
  await expect(page).toHaveURL(/login\.html/);
  await expect(page).toHaveTitle(/Login - Rolnopol/);
});

test.describe("Login page", () => {
  test(
    "loads and displays the login form",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      // Arrange
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();

      // Assert
      await expect(page).toHaveTitle(/Login - Rolnopol/);

      await expect(loginPage.container).toBeVisible();
      await expect(loginPage.form).toBeVisible();
      await expect(loginPage.emailInput).toBeVisible();
      await expect(loginPage.passwordInput).toBeVisible();
      await expect(loginPage.submitButton).toBeVisible();
      await expect(loginPage.registerLink).toBeVisible();
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
      const loginPage = new LoginPage(page);

      // Act
      await loginPage.goto();

      // Assert
      await expect(page).toHaveTitle(/Login - Rolnopol/);

      await expect(loginPage.subtitle).toBeVisible();
      await expect(loginPage.subtitle).toHaveText(expectedSubtitle);
    },
  );
});

test.describe("Register page", () => {
  test(
    "loads and displays the registration form",
    { tag: ["@smoke", "@auth"] },
    async ({ page }) => {
      // Arrange
      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();

      // Assert
      await expect(page).toHaveTitle(/Register - Rolnopol/);

      await expect(registerPage.container).toBeVisible();
      await expect(registerPage.form).toBeVisible();
      await expect(registerPage.emailInput).toBeVisible();
      await expect(registerPage.displayNameInput).toBeVisible();
      await expect(registerPage.passwordInput).toBeVisible();
      await expect(registerPage.submitButton).toBeVisible();
      await expect(registerPage.loginLink).toBeVisible();
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
      const registerPage = new RegisterPage(page);

      // Act
      await registerPage.goto();

      // Assert
      await expect(page).toHaveTitle(/Register - Rolnopol/);

      await expect(registerPage.subtitle).toBeVisible();
      await expect(registerPage.subtitle).toHaveText(expectedSubtitle);
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
      const email = uniqueEmail();
      const registerPage = new RegisterPage(page);
      await registerPage.goto();

      // Act
      await registerPage.register(email, "TestPass123", "Copilot Tester");

      // Assert
      // A success notification banner confirms the registration succeeded.
      await expect(registerPage.successBanner).toBeVisible();
      await expect(registerPage.successBanner).toContainText(
        "Registration successful!",
      );

      // A successful registration redirects the user to the login page.
      await expect(page).toHaveURL(/login\.html/, { timeout: 30 * 1000 });
      await expect(page).toHaveTitle(/Login - Rolnopol/);
    },
  );
});

test.describe("Registration negative scenarios", () => {
  test(
    "rejects an invalid email address",
    { tag: ["@auth"] },
    async ({ page }) => {
      // Arrange
      const registerPage = new RegisterPage(page);
      await registerPage.goto();

      // Act
      await registerPage.register("not-an-email", "TestPass123", "Copilot Tester");

      // Assert
      await expect(registerPage.emailError).toBeVisible();
      await expect(registerPage.emailError).toHaveText(
        "Please enter a valid email address",
      );

      // The form must not submit while the email is invalid.
      await expect(registerPage.successBanner).not.toBeVisible();
      await expect(page).toHaveURL(/register\.html/);
    },
  );

  test(
    "rejects a display name shorter than the minimum length",
    { tag: ["@auth"] },
    async ({ page }) => {
      // Arrange
      const email = uniqueEmail();
      const registerPage = new RegisterPage(page);
      await registerPage.goto();

      // Act
      // The display name field requires a minimum of 3 characters.
      await registerPage.register(email, "TestPass123", "Jo");

      // Assert
      await expect(registerPage.displayNameError).toBeVisible();
      await expect(registerPage.displayNameError).toHaveText(
        "Display name must be at least 3 characters",
      );

      await expect(registerPage.successBanner).not.toBeVisible();
      await expect(page).toHaveURL(/register\.html/);
    },
  );

  test(
    "rejects a password shorter than the minimum length",
    { tag: ["@auth"] },
    async ({ page }) => {
      // Arrange
      const email = uniqueEmail();
      const registerPage = new RegisterPage(page);
      await registerPage.goto();

      // Act
      // The password field requires a minimum of 3 characters.
      await registerPage.register(email, "ab", "Copilot Tester");

      // Assert
      await expect(registerPage.passwordError).toBeVisible();
      await expect(registerPage.passwordError).toHaveText(
        "Password must be at least 3 characters",
      );

      await expect(registerPage.successBanner).not.toBeVisible();
      await expect(page).toHaveURL(/register\.html/);
    },
  );
});

test.describe("Documentation page", () => {
  test(
    "loads and displays the documentation content",
    { tag: ["@smoke"] },
    async ({ page }) => {
      // Arrange
      const docsPage = new DocsPage(page);

      // Act
      await docsPage.goto();

      // Assert
      await expect(page).toHaveTitle(/Documentation - Rolnopol/);

      await expect(docsPage.container).toBeVisible();
      await expect(docsPage.header).toBeVisible();
      await expect(docsPage.sidebar).toBeVisible();
      await expect(docsPage.nav).toBeVisible();
      await expect(docsPage.content).toBeVisible();
    },
  );
});

test.describe("Swagger page", () => {
  test(
    "loads and displays the API documentation frame",
    { tag: ["@smoke"] },
    async ({ page }) => {
      // Arrange
      const swaggerPage = new SwaggerPage(page);

      // Act
      await swaggerPage.goto();

      // Assert
      await expect(page).toHaveTitle(/Rolnopol - Swagger/);

      await expect(swaggerPage.frame).toBeVisible();
    },
  );
});
