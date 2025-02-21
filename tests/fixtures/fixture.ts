import { test as base } from "@playwright/test";
import { HomePage } from "../../app/pages/HomePage";
import { SearchResultsPage } from "../../app/pages/SearchResultsPage";
import { CatalogPage } from "../../app/pages/CatalogPage";
import { CookiesHelper } from "../../helpers/CookiesHelper";
import path from "path";
import fs from "fs";

const dirPath = path.resolve("tests", ".session");
const filePath = path.join(dirPath, `/state.json`);

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
};

export const test = base.extend<Pages>({
  storageState: async ({ request, baseURL }, use) => {
    const cookiesHelper = new CookiesHelper(filePath);

    if (!baseURL) {
      throw new Error("baseURL is not defined");
    }

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const requiresAuth = test.info().tags.includes("@loggedUser");
    let needAuth = false;
    let needCookies = false;

    if (fs.existsSync(filePath)) {
      if (!requiresAuth) {
        await use(filePath);
        return;
      } else {
        if (cookiesHelper.isTokenExistsInCookies()) {
          if (await cookiesHelper.isTokenValid(request)) {
            await use(filePath);
            return;
          } else {
            needAuth = true;
          }
        } else {
          needAuth = true;
        }
      }
    } else {
      if (requiresAuth) {
        needAuth = true;
      } else {
        needCookies = true;
      }
    }

    if (needAuth) {
      await cookiesHelper.performFullAuthFlow(baseURL);
    } else if (needCookies) {
      await cookiesHelper.storeCookiesState(baseURL);
    }

    await use(filePath);
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
