import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";

/**
 * Page Object for the Swagger API documentation page (`/swagger.html`).
 */
export class SwaggerPage extends BasePage {
  private static readonly URL = "/swagger.html";
  readonly frame: Locator;

  constructor(page: Page) {
    super(page, SwaggerPage.URL);
    // No data-testid is exposed for this page, so the frame id is used instead.
    this.frame = page.locator("#swagger-frame");
  }
}
