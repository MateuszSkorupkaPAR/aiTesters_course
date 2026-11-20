# Rolnopol Playwright Tests

This repository contains Playwright tests for Rolnopol; the application itself is not included.

## Setup

Install the project dependencies and Playwright browsers:

```sh
npm install
npx playwright install
```

Before running tests, make sure Rolnopol is running at [http://localhost:3000](http://localhost:3000).

## Run tests

```sh
npm test
npm run test:headed
```

For project guidance, see [CODING_STANDARDS.md](CODING_STANDARDS.md), [TEST_PLAN.md](TEST_PLAN.md), and [.github/agents.md](.github/agents.md).
