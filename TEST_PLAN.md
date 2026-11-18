# Test Plan — Rolnopol

Source: official documentation at `/docs.html` (http://localhost:3000/docs.html)

## Overview

Rolnopol is an agricultural management system. Users (farmers) manage farm resources
(fields, animals, staff, assignments), trade on an internal marketplace, and track a
virtual-currency balance. Admins/superadmins have oversight of all users' data. Some
features are behind flags (Alerts, Contact Form, Interactive Map, Survival game).

## Objectives

- Core flows work correctly: auth, farm management, marketplace, finances.
- Role-based access control is enforced.
- Business rules (asset ownership, no-overdraft) are respected.
- Feature-flagged modules behave correctly on/off.

## Scope

- Registration & Login (session expiry, logout, rate limiting)
- Farm & Resource Management (fields, animals, staff, assignments)
- Marketplace Trading (create/browse/buy/cancel offers)
- Financial Operations (balance, transactions, transfers, no overdraft)
- Role-based access control (User vs Admin vs Superadmin)
- Feature flags: Alerts, Contact Form, Interactive Map, Survival game
- API basics (auth required, Swagger UI/OpenAPI availability)

Out of scope: performance/load testing, security penetration testing, Survival game
client-side logic.

## Key Scenarios

1. Register → login → set up farm (add field, animals, staff, assignments).
   `@smoke @auth @farm-management`
2. Sell a field: User A creates offer → User B buys it → ownership/balance update, offer
   marked `sold`.
   `@smoke @marketplace @finance`
3. Attempt to sell an assigned/in-use asset → offer is `unavailable`.
   `@marketplace @business-rules`
4. Attempt to buy with insufficient funds → blocked with error.
   `@marketplace @finance @business-rules`
5. Farmer tries to access admin-only data/pages → denied.
   `@rbac`
6. Each feature-flagged module: check behavior both enabled and disabled (e.g. Alerts page
   hidden/404 when `alertsEnabled` is off; Contact form hidden/404 when off).
   `@feature-flags`

### Tag Legend

| Tag                | Meaning                                                    |
|---------------------|-------------------------------------------------------------|
| `@smoke`            | Critical-path case; run on every quick/smoke pass.          |
| `@auth`             | Registration, login, session, logout, rate limiting.        |
| `@farm-management`  | Fields, animals, staff, assignments CRUD.                   |
| `@marketplace`      | Offer creation, browsing, buying, cancelling.                |
| `@finance`          | Balance, transactions, transfers.                            |
| `@business-rules`   | Domain rule enforcement (ownership, no-overdraft, etc.).     |
| `@rbac`             | Role-based access control (User vs Admin vs Superadmin).     |
| `@feature-flags`    | Behavior toggled by feature flags (Alerts, Contact Form,    |
|                     | Interactive Map, Survival game).                             |
| `@api`              | API-level checks (auth required, Swagger/OpenAPI).           |

Apply these as Playwright tags on each spec, e.g.:

```ts
test('sell a field updates ownership and balance', { tag: ['@smoke', '@marketplace', '@finance'] }, async ({ page }) => {
  // ...
});
```

Run a subset with `npx playwright test --grep @smoke` (or combine, e.g.
`--grep "@marketplace.*@business-rules"`).

## Test Data

| Role        | Email                      | Password     |
|-------------|------------------------------|---------------|
| Demo Farmer | demo@example.com             | demo123       |
| Demo Farmer | test@example.com             | brownPass123  |
| Demo Farmer | john.doe@example.com         | johndoe123    |
| Demo Farmer | emptyuser@rolnopol.demo.pl    | demoPass123   |

Admin/superadmin test accounts are not documented — confirm separately.

## Tools

Playwright ([playwright.config.ts](/playwright.config.ts), `baseURL: http://localhost:3000`)
for UI/API tests; Swagger UI (`/swagger.html`) for manual API exploration.

## Implemented Tests

Source: [tests/smoke-tests.spec.ts](/tests/smoke-tests.spec.ts)

| Test                                                       | Tags            |
|-------------------------------------------------------------|-----------------|
| Home page has title                                        | `@smoke`        |
| Home page login link navigates to login page                | `@smoke @auth`  |
| Login page loads and displays the login form                | `@smoke @auth`  |
| Login page loads and displays the login subtitle             | `@smoke @auth`  |
| Register page loads and displays the registration form       | `@smoke @auth`  |
| Register page loads and displays the registration subtitle   | `@smoke @auth`  |
| Registration registers a new user successfully                | `@smoke @auth`  |
| Documentation page loads and displays the documentation content | `@smoke`     |
| Swagger page loads and displays the API documentation frame  | `@smoke`        |

These cover the page-load/rendering checks and the happy-path registration flow from Key
Scenario 1 (registration step only — login after registration, farm setup, marketplace,
finance, RBAC, and feature-flag scenarios below are not yet automated).

## Next Steps

Remaining scenarios to convert into Playwright specs under [tests/](/tests):

- Log in with an existing account and set up a farm (field, animals, staff, assignments) —
  completes Key Scenario 1.
- Key Scenario 2: sell a field between two users (ownership/balance update, offer `sold`).
- Key Scenario 3: attempt to sell an assigned/in-use asset (offer `unavailable`).
- Key Scenario 4: attempt to buy with insufficient funds (blocked with error).
- Key Scenario 5: farmer tries to access admin-only data/pages (denied).
- Key Scenario 6: feature-flagged modules behave correctly on/off (Alerts, Contact Form,
  Interactive Map, Survival game).
