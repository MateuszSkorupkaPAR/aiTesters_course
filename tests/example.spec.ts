import { expect, test } from "@playwright/test";

test("has title", { tag: ["@smoke"] }, async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Rolnopol/);
});

test("login link", { tag: ["@smoke", "@auth"] }, async ({ page }) => {
  await page.goto("/");

  // Click the login link.
  await page.getByRole("link", { name: "Login" }).click();

  // Expects page to navigate to the login page.
  await expect(page).toHaveURL(/login\.html/);
  await expect(page).toHaveTitle(/Login - Rolnopol/);
});
