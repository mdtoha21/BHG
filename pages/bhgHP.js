import { expect } from '@playwright/test';

export class HomePage{
  // constructor runs automatically when you do: new LoginPage(page)
  // it sets up all the locators once so we can reuse them in every method
  constructor(page) {
    this.page = page;
    //this.articles=page.locator('//div[@id="mntl-taxonomysc-article-list-group_1-0"]/div/div[1]/a');
    this.header_navs='//nav[@id="mm-nav-header-nav_1-0"]/div[1]/ul/li/a';
    this.sub_navs='//nav[@id="mm-nav-header-nav_1-0"]/div[1]/ul/li/ul/li/a';
    this.newsletter='//div[@id="mm-nav-utility-nav_1-0"]/ul/li[3]/a';
    this.newsletter_checkboxes='//div[@id="mntl-newsletter_1-0"]//ul[@class="newsletter__subscriptions-list"]/li/input';

  }
  async goto_bhg() {
    await this.page.goto('https://www.bhg.com/');

  }

  async nav_click(name){
    const links=await this.page.$$(this.header_navs);
    for(const link of links){
        const text=await link.textContent();

        if(text.trim()==name){
            await link.click();
            break;
        }
    }

  }
    async sub_nav_click(name){
    const links=await this.page.$$(this.sub_navs);
    for(const link of links){

        const text=await link.textContent();

        if(text.trim()==name){
            await link.click();
            break;
        }
    }

  }

  async newsletter_check(email,checkboxes){

    await this.page.locator(this.newsletter).click();
    await expect(this.page.getByRole('dialog',{name:'Newsletter Sign Up'})).toBeVisible();
    await this.page.locator('//div[@id="mntl-newsletter_1-0"]/form/div[2]/input').fill(email);

   const boxes= await this.page.$$(this.newsletter_checkboxes);

    for(const box of boxes){

        if(await box.isChecked()){

            await box.uncheck({ force: true });
            
        }

    }

    for(const checkbox of checkboxes){

        for(const box of boxes){

            const text=await box.getAttribute('data-title');

            if(text.trim()==checkbox){
                await box.check({ force: true });
            }

            
        }
    }

    await this.page.locator('//div[@id="mntl-newsletter_1-0"]/form/button').click();

    await expect(this.page.locator('//div[@id="mntl-newsletter_1-0"]/div/p')).toBeVisible();
    const text=await this.page.locator('//div[@id="mntl-newsletter_1-0"]/div/p');

    console.log(`${text}`);


  }
  
}


