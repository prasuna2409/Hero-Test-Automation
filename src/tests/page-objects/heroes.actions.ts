import { DashboardPage } from "./dashboard.page";
import { HeroesPage } from "./heroes.page";
import { Page } from "@playwright/test"

export class HeroesActions{
    readonly dashboardPage : DashboardPage;
    readonly heroesPage : HeroesPage;
    readonly page: Page;

    constructor(page: Page){
        this.dashboardPage =  new DashboardPage(page);
        this.heroesPage = new HeroesPage(page);
   }
    
   async addOneHero(heroName: string, heroScore: string): Promise<void>{
    await (await this.heroesPage.getNewHero()).fill(heroName);
    await (await this.heroesPage.getNewScore()).fill(heroScore);
    await (await this.heroesPage.getAddButton()).click();
} 
   
   async getHeroesList() : Promise<string[]>{
     const heroList = await this.heroesPage.getHeroesList();
     const heroNames = await Promise.all((await heroList.all()).map(async (li) => { return await li.textContent(); }));
     console.log(heroNames)
     return heroNames.filter((text) => (text) !== null) as string[];
   }

}