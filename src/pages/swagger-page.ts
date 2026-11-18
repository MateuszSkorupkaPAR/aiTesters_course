import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
import { Routes } from "../data/constants/routes";

/**
 * Page Object for the Swagger API documentation page (`/swagger.html`).
 */
export class SwaggerPage extends BasePage {
  readonly frame: Locator;

  constructor(page: Page) {
    super(page, Routes.swagger);
    // No data-testid is exposed for this page, so the frame id is used instead.
    this.frame = page.locator("#swagger-frame");
  }
}
