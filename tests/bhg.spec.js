import { test, expect } from '../fixtures/index.js';

test('BHG', async ({
  page,
  mainPage
}) => {

await mainPage.goto_bhg();

await page.locator('//nav[@id="mm-nav-header-nav_1-0"]/div[1]/ul/li[1]').hover();

await mainPage.sub_nav_click('Decor Styles');

await expect(page).toHaveURL('https://www.bhg.com/decorating-styles-and-themes-5546004');

const checkboxes=['BHG Daily Inspiration', 'BHG Daily Recipe','BHG Shopping','Grow & Tell','BHG Decorating Newsletter','Real Simple Partner Offers'];
await page.locator('//div[@id="mm-nav-utility-nav_1-0"]/ul/li[3]/a').click();

await expect(await page.locator('//div[@id="mntl-newsletter_1-0"]//ul[@class="newsletter__subscriptions-list"]/li[5]/input').isChecked()).toBeFalsy();
});
