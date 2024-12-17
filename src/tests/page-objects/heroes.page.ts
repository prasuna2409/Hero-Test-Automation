import { Locator, Page } from '@playwright/test';

export class HeroesPage{
    readonly page: Page;
    readonly newHero: Locator;
    readonly newScore: Locator;
    readonly addHero: Locator;
    readonly heroesList: Locator;
   
    constructor (page: Page){
        this.page = page;
        this.newHero = page.locator('#new-hero');
        this.newScore = page.locator('#hero-score');
        this.addHero = page.locator('button.add-button');
        this.heroesList = page.locator('ul.heroes li');
        }
    
   async getNewHero() :Promise<Locator>{
       return this.newHero;
   }

   async getNewScore(): Promise<Locator>{
       return this.newScore;
   }

   async getHeroesList(): Promise<Locator>{
       return this.heroesList;
   }

   async getAddButton(): Promise<Locator>{
       return this.addHero;
   }

   async deleteOneHero(hreflink : string): Promise<void>{
    const locatorVal = 'ul > li > a[href=\"'+hreflink+'\"] + button.delete';
    console.log(locatorVal);
    await this.page.waitForSelector(locatorVal, { state:'visible'});
    const deleteButton = await this.page.locator(locatorVal);
    await deleteButton.click();
  }
 
    
}

