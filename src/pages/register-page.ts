import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

/**
 * Page Object for the registration page (`/register.html`).
 */
export class RegisterPage extends BasePage {
  private static readonly URL = "/register.html";
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
    super(page, RegisterPage.URL);
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

  async fillRegistrationForm(email: string, password: string, displayName?: string) {
    await this.emailInput.fill(email);
    if (displayName !== undefined) {
      await this.displayNameInput.fill(displayName);
    }
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async register(email: string, password: string, displayName?: string) {
    await this.fillRegistrationForm(email, password, displayName);
    await this.submit();
  }
}
