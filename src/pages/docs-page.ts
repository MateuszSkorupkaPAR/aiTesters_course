import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

/**
 * Page Object for the documentation page (`/docs.html`).
 */
export class DocsPage extends BasePage {
  private static readonly URL = "/docs.html";
  readonly container: Locator;
  readonly header: Locator;
  readonly sidebar: Locator;
  readonly nav: Locator;
  readonly content: Locator;

  constructor(page: Page) {
    super(page, DocsPage.URL);
    this.container = page.getByTestId("docs-container");
    this.header = page.getByTestId("docs-header");
    this.sidebar = page.getByTestId("docs-sidebar");
    this.nav = page.getByTestId("docs-nav");
    this.content = page.getByTestId("docs-content");
  }
}
