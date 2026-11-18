import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

/**
 * Page Object for the login page (`/login.html`).
 */
export class LoginPage extends BasePage {
  private static readonly URL = "/login.html";
  readonly container: Locator;
  readonly form: Locator;
  readonly subtitle: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly registerLink: Locator;

  constructor(page: Page) {
    super(page, LoginPage.URL);
    this.container = page.getByTestId("login-container");
    this.form = page.getByTestId("login-form");
    this.subtitle = page.getByTestId("login-subtitle");
    this.emailInput = page.getByTestId("email-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("login-submit-btn");
    this.registerLink = page.getByTestId("register-link");
  }

  async fillLoginForm(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email: string, password: string) {
    await this.fillLoginForm(email, password);
    await this.submit();
  }
}
