import { test as base } from "@playwright/test";
import { HomePage } from "../../app/pages/HomePage";
import { SearchResultsPage } from "../../app/pages/SearchResultsPage";

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
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
});
