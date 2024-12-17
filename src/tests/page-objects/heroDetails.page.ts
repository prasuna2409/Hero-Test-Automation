import { Locator, Page } from '@playwright/test';

export class HeroDetailsPage{
    readonly page: Page;
    readonly heroDetails: Locator;
    readonly heroName: Locator;
    readonly heroScore : Locator;
    readonly goBackButton: Locator;
    readonly saveButton: Locator;

    constructor (page: Page){
      this.heroDetails = page.locator('body > app-root > app-hero-detail');
      this.heroName = page.locator('#hero-name');
      this.heroScore = page.locator('#hero-score');
      this.goBackButton = page.locator('button',{ hasText: 'go back' });
      this.saveButton = page.locator('button', { hasText: 'save'});
    }

    async getHeroDetails(): Promise<Locator>{
        return this.heroDetails;
    }

    async getHeroName(): Promise<Locator>{
        return this.heroName;
    }

    async getHeroScore(): Promise<Locator>{
        return this.heroScore;
    }

    async getBackButton(): Promise<Locator>{
        return this.goBackButton;
    }

    async getSaveButton(): Promise<Locator>{
        return this.saveButton;
    }
    
    
    
}

