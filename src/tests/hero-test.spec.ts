import { test, expect } from '@playwright/test';
import dataSet from '/Users/arunprasadr/Documents/HeroTestAutomationPlaywrightProject/Hero-Test-Automation/src/test-resources/testdata/data.json';
import { DashboardActions } from './page-objects/dashboard.actions';
import { HeroDetailsActions } from './page-objects/heroDetails.actions';
import { HeroesActions } from './page-objects/heroes.actions';
import { CommonUtils } from '/Users/arunprasadr/Documents/HeroTestAutomationPlaywrightProject/Hero-Test-Automation/src/test-resources/common.utility.ts'

let dashboard: DashboardActions;
let heroDetails: HeroDetailsActions;
let heroesActions: HeroesActions;
let heroName: any;
let heroScore: any;
let searchString: string;
let heroId: number;

test.beforeEach(async ({page}) => {
     // Set up a listener for dialog before each test
     page.on('dialog', async(dialog) => {
        console.log('Dialog appeared:',dialog.message());
        await dialog.accept();
    });
    dashboard = new DashboardActions(page);
    heroDetails = new HeroDetailsActions(page);
    heroesActions = new HeroesActions(page);
    await page.goto('http://localhost:4200/dashboard');
});

test.afterEach(async ({page}) =>{
    await page.close();
});


test('Add a new hero and verify they appear in the hero list', async ({ page }) => {

// Your code here
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'addHero','heroName');
    heroScore = CommonUtils.getTestDataFromJson(dataSet, 'addHero','score')
    searchString = heroName + ' - ' + heroScore 
    console.log(searchString);
    await Promise.all([page.waitForURL('http://localhost:4200/heroes'), await dashboard.clickonHeroes()]);
    await heroesActions.addOneHero(heroName, heroScore);
    await page.waitForSelector('ul.heroes li', { state: 'visible', timeout : 10000});
    const heroList = await heroesActions.getHeroesList();
    console.log(heroList);
    const exists = heroList.some(str => str.includes(searchString));
    expect(exists).toBeTruthy();
});

test('Verify searching for a hero works', async ({ page }) => {

    // Your code here
    heroId = CommonUtils.getTestDataFromJson(dataSet, 'searchHero', 'id');
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'searchHero', 'heroName');
    heroScore = CommonUtils.getTestDataFromJson(dataSet, 'searchHero', 'score');
    await page.waitForSelector('#search-box', { state: 'visible'});
    await dashboard.searchHeroes(heroName);
    await page.waitForSelector('.search-result',{ timeout: 20000});
    await Promise.all([page.waitForURL('http://localhost:4200/detail/'+heroId), await dashboard.clickOnSearchResult()]);
    expect(page.url()).toBe('http://localhost:4200/detail/'+heroId);
    await page.waitForSelector('body > app-root > app-hero-detail',{ state: 'visible'});
    const herodetails = await heroDetails.getHeroDetails();
    console.log(herodetails);
    const upperText = heroName.toUpperCase();
    const nameExists = herodetails.some(str => str.includes(upperText));
    const scoreExists = herodetails.some(str => str.includes(heroScore));
    expect(nameExists).toBeTruthy();
});

test('Verify deleting a hero removes them from the list', async ({ page }) => {

    // Your code here
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'deleteHero','heroName');
    heroId = CommonUtils.getTestDataFromJson(dataSet,'deleteHero','id');
    searchString = '/detail/'+heroId;
    await Promise.all([page.waitForURL('http://localhost:4200/heroes'), await dashboard.clickonHeroes()]);
    await page.waitForSelector('ul.heroes li', { state: 'visible'});
    await heroesActions.heroesPage.deleteOneHero(searchString);
    await page.waitForTimeout(2000);
    const heroList = await heroesActions.getHeroesList();
    console.log(heroList);
    const exists = heroList.some(str => str.includes(heroName));
    expect(exists).toBeFalsy();
}
);

test("Verify a hero's name and score can be modified", async ({ page }) => {

    // Your code here
    heroId = CommonUtils.getTestDataFromJson(dataSet, 'searchHero', 'id');
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'searchHero', 'heroName');
    heroScore = CommonUtils.getTestDataFromJson(dataSet, 'searchHero', 'score');
    let heroNameNew = heroName + '1'
    let heroScoreNew = heroScore + 1;
    await page.waitForSelector('#search-box', { state: 'visible'});
    await dashboard.searchHeroes(heroName);
    await page.waitForSelector('.search-result',{ timeout: 20000});
    await Promise.all([page.waitForURL('http://localhost:4200/detail/'+heroId), await dashboard.clickOnSearchResult()]);
    expect(page.url()).toBe('http://localhost:4200/detail/'+heroId);
    await page.waitForSelector('body > app-root > app-hero-detail',{ state: 'visible'});
    await Promise.all([page.waitForURL('http://localhost:4200/dashboard'), await heroDetails.updateHeroDetails(heroNameNew, heroScoreNew)]);
    expect(page.url()).toBe('http://localhost:4200/dashboard');
    await Promise.all([page.waitForURL('http://localhost:4200/heroes'), await dashboard.clickonHeroes()]);
    await page.waitForSelector('ul.heroes li', { state: 'visible'});
    const heroList = await heroesActions.getHeroesList();
    console.log(heroList);
    const heroNameexists = heroList.some(str => str.includes(heroNameNew));
    const heroScoreexists = heroList.some(str => str.includes(heroScoreNew));
    expect(heroNameexists).toBeTruthy();
    expect(heroScoreexists).toBeTruthy();
});

test("Verify that the top heroes list contains either Hurricane or Tornado", async ({ page }) => {
    
    // Your code here
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'searchHeroTwo', 'heroNameOne');
    const heroNameTwo  = CommonUtils.getTestDataFromJson(dataSet, 'searchHeroTwo', 'heroNameTwo');
    await page.waitForSelector('.heroes-menu a', { state: 'visible'});
    const topHeroes = await dashboard.getTopHeroes();
    console.log(topHeroes);
    const heroOneExists = topHeroes.some(str => str.includes(heroName));
    const heroTwoExists = topHeroes.some(str => str.includes(heroNameTwo));
    expect(heroOneExists || heroTwoExists).toBe(true);
});

test("Verify adding a new hero with a score of 600 will add them to the Top Heroes display in the dashboard", async ({ page }) => {

    // Your code here
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'addHero','heroName');
    heroScore = CommonUtils.getTestDataFromJson(dataSet, 'addHero','score')
    await Promise.all([page.waitForURL('http://localhost:4200/heroes'), await dashboard.clickonHeroes()]);
    await heroesActions.addOneHero(heroName, heroScore);
    await Promise.all([page.waitForURL('http://localhost:4200/dashboard'), await dashboard.clickonDashboard()]);
    await page.waitForSelector('.heroes-menu a', { state: 'visible'});
    const topHeroes = await dashboard.getTopHeroes();
    console.log(topHeroes);
    const nameExists = topHeroes.some(str => str.includes(heroName));
    expect(nameExists).toBe(true);
    });

test("Verify the Add hero button is disabled once the list of heroes contains more than 12 heroes", async ({ page }) => {

    // Your code here
    heroName = CommonUtils.getTestDataFromJson(dataSet, 'addHero','heroName');
    heroScore = CommonUtils.getTestDataFromJson(dataSet, 'addHero','score')
    await Promise.all([page.waitForURL('http://localhost:4200/heroes'), await dashboard.clickonHeroes()]);
    await page.waitForSelector('ul.heroes li', { state: 'visible'});
    const heroList = await heroesActions.getHeroesList();
    console.log(heroList);
    const len = heroList.length;
    expect(len).toBeLessThanOrEqual(12);
    const heroesToAdd = 12 - len;
    console.log(heroesToAdd);
    for (let i = 0 ; i < heroesToAdd; i++){
        heroName = heroName + i;
        heroScore = heroScore + i;
        await heroesActions.addOneHero(heroName, heroScore);
        await page.waitForTimeout(2000);
    }
    await page.waitForSelector('ul.heroes li', { state: 'visible'});
    const heroListNew = await heroesActions.getHeroesList();
    expect(heroListNew.length).toBe(12);
    const addButton = await heroesActions.heroesPage.getAddButton();
    const isDisabled = await addButton.isDisabled();
    expect(isDisabled).toBe(true);
});
