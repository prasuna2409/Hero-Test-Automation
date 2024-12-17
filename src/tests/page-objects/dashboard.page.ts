import { Locator, Page } from '@playwright/test';

export class DashboardPage{
    readonly page: Page;
    readonly heroesMenu: Locator;
    readonly searchBox: Locator;
    readonly searchResult: Locator;
    readonly dashboardLink: Locator;
    readonly heroesLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.heroesMenu = page.locator('.heroes-menu a');
        this.searchBox = page.locator('#search-box');
        this.searchResult = page.locator('.search-result');
        this.dashboardLink = page.locator('a[href="/dashboard"]');
        this.heroesLink = page.locator('a[href="/heroes"]')
    }

    async gethrefLink(href: string) : Promise<Locator> {
        return this.page.locator('a[href="${href}"]');
    }

    async getSearchBox() : Promise<Locator>{
        return this.searchBox;
    }

    async getSearchResult(): Promise<Locator>{
        return this.searchResult;
    }

    async getHeroesMenu() : Promise<Locator> {
        return this.heroesMenu;
    }
    
    async clickhrefLink(href: string) : Promise<void>{
        const hrefLinkLoc = await this.gethrefLink(href);
        await hrefLinkLoc.click();

    }

    async getDashboardLink(): Promise<Locator>{
       return this.dashboardLink;
    }

    async getHeroesLink(): Promise<Locator>{
        return this.heroesLink;
    }

    async searchHero(heroName: string): Promise<void>{
        (await this.getSearchBox()).fill(heroName);
    }
}

