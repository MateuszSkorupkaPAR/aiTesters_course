import type { Page } from "@playwright/test";

/**
 * Base class for Page Objects. Stores the Playwright `Page` and handles
 * navigation to the URL constant each Page Object passes in.
 */
export abstract class BasePage {
  readonly page: Page;
  private readonly url: string;

  constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
