/**
 * Central registry of page URL paths used by Page Objects. Keeping paths
 * here avoids duplicating string literals across multiple Page Object files.
 */
export const Routes = {
  home: "/",
  login: "/login.html",
  register: "/register.html",
  docs: "/docs.html",
  swagger: "/swagger.html",
} as const;
