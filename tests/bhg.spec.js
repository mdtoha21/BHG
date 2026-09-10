import { test, expect } from '../fixtures/index.js';

async function openHome(mainPage) {
  await mainPage.goto_bhg();
}

test('loads the home page@regression', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await expect(page).toHaveURL('https://www.bhg.com/');
});

test('shows the main header navigation@smoke', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await expect(mainPage.header_nav).toBeVisible();
});

test('shows the utility navigation@regression', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await expect(mainPage.utility_nav).toBeVisible();
});

test('hovers the first header item@smoke', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await mainPage.open_header_menu();
  await expect(mainPage.first_header_item).toBeVisible();
});

test('opens decor styles@regression', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await mainPage.open_decor_styles();
  await expect(page).toHaveURL('https://www.bhg.com/decorating-styles-and-themes-5546004');
});

test('keeps bhg on the same domain@smoke', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await expect(page).toHaveURL(/bhg\.com/);
});

test('opens the newsletter dialog@regression', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await mainPage.open_newsletter();
  await expect(mainPage.newsletter_dialog).toBeVisible();
});

test('submits a second newsletter choice@smoke', async ({ mainPage }) => {
  await openHome(mainPage);
  await mainPage.newsletter_check('test@example.com', ['BHG Shopping']);
});

test('submits two newsletter choices@regression', async ({ mainPage }) => {
  await openHome(mainPage);
  await mainPage.newsletter_check('test@example.com', ['BHG Daily Inspiration', 'BHG Shopping']);
});

test('submits a gardening newsletter choice@sanity', async ({ mainPage }) => {
  await openHome(mainPage);
  await mainPage.newsletter_check('test@example.com', ['Grow & Tell']);
});

test('opens home page again after navigation@regression', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await mainPage.open_decor_styles();
  await expect(page).toHaveURL('https://www.bhg.com/decorating-styles-and-themes-5546004');
  await mainPage.goto_bhg();
  await expect(page).toHaveURL('https://www.bhg.com/');
});

test('checks bhg url@regression', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await expect(mainPage.header_nav).toBeVisible();
});

test('verifies the newsletter link exists@sanity', async ({ page, mainPage }) => {
  await openHome(mainPage);
  await expect(mainPage.newsletter).toBeVisible();
});

test('shows newsletter options through the helper@sanity', async ({ mainPage }) => {
  await openHome(mainPage);
  await mainPage.open_newsletter();
  await expect(mainPage.newsletter_options).toHaveCount(6);
});
