import { test as base } from "@playwright/test";
import { HomePage } from "../../app/pages/HomePage";
import { SearchResultsPage } from "../../app/pages/SearchResultsPage";
import { CatalogPage } from "../../app/pages/CatalogPage";
import { getAuthToken } from "../../app/api/utils/auth";
import path from "path";
import fs from "fs";

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
};

export const test = base.extend<Pages>({
  storageState: async ({ browser, request, baseURL }, use) => {
    const dirPath = path.resolve("tests", ".auth");
    const fileName = path.join(dirPath, `/token.json`);
    if (!baseURL) {
      throw new Error("baseURL is not defined");
    }

    if (!fs.existsSync(fileName)) {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto(baseURL);

      const token = await getAuthToken(request);

      context.addInitScript((token) => {
        localStorage.setItem("auth_token", token);
      }, token);

      await context.storageState({ path: fileName });
      await browser.close();
    }

    await use(fileName);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    await use(searchResultsPage);
  },

  catalogPage: async ({ page }, use) => {
    const catalogPage = new CatalogPage(page);
    await use(catalogPage);
  },
});
