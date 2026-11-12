import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  timeout: 10 * 1000,
  reporter: [["html", { open: "never" }]],
  use: {
    trace: "on",
    baseURL: "http://localhost:3000",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
