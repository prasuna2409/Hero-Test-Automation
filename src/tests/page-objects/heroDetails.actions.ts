import { DashboardPage } from "./dashboard.page";
import { HeroDetailsPage } from "./heroDetails.page";
import { Page } from "@playwright/test"

export class HeroDetailsActions{
    readonly dashboardPage : DashboardPage;
    readonly heroDetailsPage : HeroDetailsPage;

    constructor(page: Page){
        this.dashboardPage =  new DashboardPage(page);
        this.heroDetailsPage = new HeroDetailsPage(page);
    }

    async getHeroDetails() : Promise<string[]>{
      const divs = await this.heroDetailsPage.getHeroDetails();
      const divElements = await Promise.all( (await divs.all()).map(async (div) => { return await div.textContent(); }))
      console.log('Div Elements', divElements);
      return divElements.filter((text) => text !== null ) as string[];
    }

    async updateHeroDetails(heroName: string, heroScore: string): Promise<void>{
      await (await this.heroDetailsPage.getHeroName()).fill(heroName);
      await (await this.heroDetailsPage.getHeroScore()).fill(heroScore);
      (await this.heroDetailsPage.getSaveButton()).click();
    }

}