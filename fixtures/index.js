import { test as base } from '@playwright/test';
import { HomePage } from '../pages/bhgHP.js';


// base.extend() adds our custom page objects to Playwright's built-in fixtures
// this means any test can receive them as parameters automatically
// e.g. test('my test', async ({ loginPage, inventoryPage }) => { ... })
// Playwright creates each page object before the test and cleans up after
export const test = base.extend({

  // injects a LoginPage instance into the test
  // use() hands the object to the test, then waits for the test to finish
  mainPage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  
});

// re-export expect so tests only need to import from this file
export { expect } from '@playwright/test';
