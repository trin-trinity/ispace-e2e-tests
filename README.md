# ispace-e2e-tests

**End-to-End Test Suite for ispace.ua**

This repository contains a comprehensive end-to-end test suite for the [ispace.ua store](https://ispace.ua). Built with [Playwright](https://playwright.dev/) and [TypeScript](https://www.typescriptlang.org/), this project is designed to verify critical user journeys and functionality of the store’s web application.

> [!IMPORTANT]  
> The site [ispace.ua store] (https://ispace.ua) is constantly changing, so this possible solution may no longer work.
---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
  - [Running All Tests](#running-all-tests)
  - [Running Specific Test Suites](#running-specific-test-suites)
  - [Running Tests by Tag](#running-tests-by-tag)
- [Continuous Integration](#continuous-integration)
- [Contact](#contact)

---

## Features

- **Comprehensive Testing:**  
  Covers basket, favorites, filters, product details, search, and more.
- **Test Parameterization:**  
  Tests are parameterized to run with various data sets, increasing flexibility and coverage.
- **Parallel Execution:**  
  Tests run in parallel to optimize execution time. By default, tests use **3 workers**.
- **Special Handling for Basket Tests:**  
  Basket tests run on a single worker (`--workers=1`) to ensure stability due to shared user state.
- **CI Ready:**  
  Integrated GitHub Actions workflow supports dynamic test selection (by suite or tag).

---

## Project Structure
```
📦ispace-e2e-tests
 ┣ 📂.github
 ┃ ┗ 📂workflows
 ┃ ┃ ┗ 📜playwright.yml  ---> GitHub Actions workflow for CI testing
 ┣ 📂app
 ┃ ┣ 📂api  ----------------> All logic related to api calls                
 ┃ ┣ 📂components ----------> Component objects for POM 
 ┃ ┣ 📂fragments -----------> Fragment objects for POM 
 ┃ ┣ 📂pages ---------------> Page objects for for POM
 ┣ 📂data ------------------> Test data
 ┣ 📂helpers ---------------> Utility functions and shared helpers
 ┣ 📂tests
 ┃ ┣ 📂.session
 ┃ ┃ ┗ 📜state.json --------> File for reusing state in tests
 ┃ ┣ 📂fixtures
 ┃ ┃ ┗ 📜fixture.ts --------> Test fixtures (sample data and configurations)
 ┃ ┣ 📜basket.test.ts ------> Tests related to the basket functionality
 ┃ ┣ 📜favorites.test.ts ---> Tests for the favorites feature
 ┃ ┣ 📜filters.test.ts -----> Tests for product filters
 ┃ ┣ 📜productDetails.test.ts -> Tests for product detail pages
 ┃ ┗ 📜search.test.ts ------> Tests for the search functionality
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜eslint.config.mjs
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜playwright.config.ts
 ┗ 📜tsconfig.json
```

---

## Requirements

- **Node.js:** v14 or later (v16+ recommended)
- **npm:** v6+
- **Playwright:** For browser automation and testing

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/trin-trinity/ispace-e2e-tests.git
   cd ispace-e2e-tests
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

> [!NOTE]  
> The `postinstall` script automatically installs the required Playwright browsers.

## Configuration
**TypeScript & Path Aliases**

The project uses a tsconfig.json file to manage TypeScript settings and simplify module imports. For example:
 ```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ESNext", "DOM"],
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@components/*": ["app/components/*"],
      "@fragments/*": ["app/fragments/*"],
      "@pages/*": ["app/pages/*"],
      "@api/*": ["app/api/*"],
      "@helpers/*": ["helpers/*"],
      "@data/*": ["data/*"],
      "@fixtures/*": ["tests/fixtures/*"]
    }
  },
  "include": ["**/*.ts"],
  "exclude": ["node_modules"]
}

```
**Environment Variables**

Before running tests, ensure that the following environment variables are configured (via a .env file or your CI environment):
- BASE_URL
- EMAIL
- PASSWORD

## Usage

**Running All Tests**

To run all tests:
```bash
npm run test
```

**Running Specific Test Suites**

The project defines dedicated npm scripts for each suite:
- Basket Tests (Single Worker):
```bash
npm run test:basket
```
- Favorites Tests:
```bash
npm run test:favorites
```
- Filters Tests:
```bash
npm run test:filters
```

- Product Details Tests:
```bash
npm run test:productDetails
```

- Search Tests:
```bash
npm run test:search
```
_Example package.json scripts section:_
```json
"scripts": {
    "test": "npx playwright test",
    "test:basket": "npx playwright test basket.test.ts --workers=1",
    "test:others": "npx playwright test --grep-invert \"@basket\"",
    "test:favorites": "npx playwright test favorites.test.ts",
    "test:filters": "npx playwright test filters.test.ts",
    "test:productDetails": "npx playwright test productDetails.test.ts",
    "test:search": "npx playwright test search.test.ts",
    "show-report": "npx playwright show-report",
    "postinstall": "npx playwright install --with-deps",
    "test:tag:loggedUser": "npx playwright test --grep \"@loggedUser\"",
    "test:tag:basket": "npx playwright test --grep \"@basket\" --workers=1"
  },
```

**Running Tests by Tag**

You can filter tests by tags using commands. For example:

- Basket Tag (Single Worker):
```bash
npm run test:tag:basket
```

- 	Logged User Tag:
```bash
npm run test:tag:loggedUser
```

## Continuous Integration
The project includes a playwright.yml GitHub Actions workflow. This workflow supports:
- Dynamic Test Selection:
Choose between running tests by suite or by tag via dropdown inputs when manually triggering the workflow.
- Conditional Jobs:
Only the jobs that match the selected suite or tag run, keeping the CI output focused and streamlined.
- Artifact Upload:
Test reports are uploaded as artifacts for easy review.

_Key options in the workflow include:_
- **runBy**: Choose between “suite” and “tag”.
- **suite**: Select a test suite (basket, favorites, filters, productDetails, search, or all).
- **tag**: Select a test tag (basket, loggedUser, or none).

## Contact

For questions, issues, or feature requests, please open an issue on GitHub or contact the maintainer at kozachenko.lera1@gmail.com.
