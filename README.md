# Webshop Automation Playwright Framework

## Overview
This project is an automated testing framework for a E-commerece application(https://demowebshop.tricentis.com/) using Playwright With JavaScript. It follows the Page Object Model (POM) design pattern for maintainability and scalability, and integrates with Allure for advanced reporting.

## Features
- Page Object Model structure for reusable and organized code
- Data-driven test support via utility methods
- Environment variable support for sensitive data
- Allure reporting integration
- Modular folder structure (pages, tests, utils, reports)
- ES6 module syntax for consistency

## Project Structure

├── pages/                # Page Object classes
├── tests/                # Test specifications
├── utils/                # Utility functions (e.g., data generation)
├── allure-report/        # Allure HTML reports
├── allure-results/       # Allure raw results
├── playwright.config.js  # Playwright configuration
├── package.json          # Project dependencies and scripts

## Test Scenarios Covered

- End-to-end workflow: user registration, product browsing, cart operations, checkout, and order confirmation
- Login functionality: valid and invalid credentials
- Product browsing: category navigation, filtering, and search
- Add to cart: single and multiple products, cart updates
- Registration: new user creation and validation
- Checkout process: address, payment, and order confirmation
- Cart page operations: view, update, and remove items
- Top menu navigation: access different categories
- Error handling and validation messages

## Setup Instructions
1. **Install dependencies:**
   In powershell
   npm install
   
2. **Set environment variables:**
   - Create a '.env' file for sensitive data (e.g., passwords).

3. **Run tests:**
   In powershell
   npx playwright test
   

4. **Generate Allure report:**
   In powershell
   npx allure generate allure-results --clean -o allure-report
   npx allure open allure-report
   

## Writing Tests
- Add new test files in the `tests/` folder using Playwright's syntax.
- Use page objects from the `pages/` folder for actions and assertions.

## Utilities
- Use functions from `utils/` for data generation and other helpers.

## Best Practices
- Keep selectors robust and maintainable (prefer data-test-id or accessibility locators).
- Use Playwright's hooks (`beforeEach`, `afterEach`) for setup/teardown.
- Clean `allure-results` before new runs for accurate reports.


