import type { Locator, Page } from "@playwright/test";

/**
 * Page Object for the registration page (`/register.html`).
 */
export class RegisterPage {
  readonly page: Page;
  readonly container: Locator;
  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly successBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.container = page.getByTestId("register-container");
    this.form = page.getByTestId("register-form");
    this.subtitle = page.getByTestId("register-subtitle");
    this.emailInput = page.getByTestId("email-input");
    this.displayNameInput = page.getByTestId("display-name-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("register-submit-btn");
    this.loginLink = page.getByTestId("login-link");
    // No data-testid is exposed for this toast, so its CSS classes are used instead.
    this.successBanner = page.locator(".notification.success");
  }

  async goto() {
    await this.page.goto("/register.html");
  }

  async fillRegistrationForm(email: string, displayName: string, password: string) {
    await this.emailInput.fill(email);
    await this.displayNameInput.fill(displayName);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async register(email: string, displayName: string, password: string) {
    await this.fillRegistrationForm(email, displayName, password);
    await this.submit();
  }
}
