import { test as base } from "@playwright/test";
import { HomePage } from "../../app/pages/HomePage";
import { SearchResultsPage } from "../../app/pages/SearchResultsPage";
import { CatalogPage } from "../../app/pages/CatalogPage";

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
};

export const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo();

    await use(homePage);
  },

  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },

  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await catalogPage.navigateTo("https://ispace.ua/ua/iphone/iphone-16-pro");

    await catalogPage.waitForResponse();

    await use(catalogPage);
  },
});
