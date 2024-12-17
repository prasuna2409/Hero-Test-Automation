import { DashboardPage } from "./dashboard.page";
import { Page } from "@playwright/test";

export class DashboardActions{
    readonly dashboardPage : DashboardPage;

    constructor(page: Page){
        this.dashboardPage = new DashboardPage(page);
    }

    async getTopHeroes(): Promise<string[]>{
        const heroesMenuList = await this.dashboardPage.getHeroesMenu();
        const hrefLinkTexts = await Promise.all((await heroesMenuList.all()).map(async (link) => {
            return await link.textContent();
        }));
         return hrefLinkTexts.filter((text) => text !== null ) as string[];
    }

    async searchHeroes(heroName: string): Promise<void>{
        await (await this.dashboardPage.getSearchBox()).fill(heroName);
     }

    async clickOnSearchResult(): Promise<void>{
        await (await this.dashboardPage.getSearchResult()).click();
    }
    
    async clickonDashboard(): Promise<void>{
       await (await this.dashboardPage.getDashboardLink()).click();
    }

    async clickonHeroes(): Promise<void>{
        await (await this.dashboardPage.getHeroesLink()).click();
    }


}