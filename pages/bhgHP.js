import { expect } from '@playwright/test';

export class HomePage{
  // constructor runs automatically when you do: new LoginPage(page)
  // it sets up all the locators once so we can reuse them in every method
  constructor(page) {
    this.page = page;
    //this.articles=page.locator('//div[@id="mntl-taxonomysc-article-list-group_1-0"]/div/div[1]/a');
    this.header_navs='//nav[@id="mm-nav-header-nav_1-0"]/div[1]/ul/li/a';
    this.sub_navs='//nav[@id="mm-nav-header-nav_1-0"]/div[1]/ul/li/ul/li/a';
    this.header_nav = page.locator('//nav[@id="mm-nav-header-nav_1-0"]');
    this.utility_nav = page.locator('//div[@id="mm-nav-utility-nav_1-0"]');
    this.first_header_item = page.locator('//nav[@id="mm-nav-header-nav_1-0"]/div[1]/ul/li[1]');
    this.newsletter = page.locator('//div[@id="mm-nav-utility-nav_1-0"]/ul/li[3]/a');
    this.newsletter_dialog = page.locator('//div[@id="mntl-newsletter_1-0"]');
    this.newsletter_email = page.locator('//div[@id="mntl-newsletter_1-0"]/form/div[2]/input');
    this.newsletter_submit = page.locator('//div[@id="mntl-newsletter_1-0"]/form/button');
    this.newsletter_confirmation = page.locator('//div[@id="mntl-newsletter_1-0"]/div/p');
    this.newsletter_options = page.locator('//div[@id="mntl-newsletter_1-0"]//ul[@class="newsletter__subscriptions-list"]/li');
    this.newsletter_checkboxes = page.locator('//div[@id="mntl-newsletter_1-0"]//ul[@class="newsletter__subscriptions-list"]/li/input');

  }
  async goto_bhg() {
    await this.page.goto('https://www.bhg.com/');

  }

  async open_header_menu() {
    await this.first_header_item.waitFor({ state: 'visible' });
    await this.first_header_item.scrollIntoViewIfNeeded();
    await this.first_header_item.hover({ force: true });
  }

  async open_decor_styles() {
    await this.open_header_menu();
    await this.sub_nav_click('Decor Styles');
  }

  async open_newsletter() {
    await this.newsletter.waitFor({ state: 'visible' });
    await this.newsletter.click({ force: true });
    await expect(this.newsletter_dialog).toBeVisible();
  }

  async nav_click(name){
    await this.page.locator(this.header_navs).filter({ hasText: name }).click();

  }
    async sub_nav_click(name){
      await this.page.locator(this.sub_navs).filter({ hasText: name }).click({ force: true });

  }

  async newsletter_check(email,checkboxes){

    await this.open_newsletter();
    await this.newsletter_email.fill(email);

       const boxCount = await this.newsletter_checkboxes.count();

    for(let index = 0; index < boxCount; index++){
      const box = this.newsletter_checkboxes.nth(index);
    }

    for(const checkbox of checkboxes){

      for(let index = 0; index < boxCount; index++){
        const box = this.newsletter_checkboxes.nth(index);

            const text=await box.getAttribute('data-title');

        if(text?.trim()==checkbox){
          await box.check({ force: true });
            }

            
        }
    }

    await this.newsletter_submit.click();

    await expect(this.newsletter_confirmation).toBeVisible();
    const text=await this.newsletter_confirmation;

    console.log(`${text}`);


  }
  
}


