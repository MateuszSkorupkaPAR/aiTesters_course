import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

/**
 * Page Object for the home page (`/`).
 */
export class HomePage extends BasePage {
  private static readonly URL = "/";
  readonly loginLink: Locator;

  constructor(page: Page) {
    super(page, HomePage.URL);
    // No data-testid is exposed for this link, so its accessible role/name is used instead.
    this.loginLink = page.getByRole("link", { name: "Login" });
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }
}
