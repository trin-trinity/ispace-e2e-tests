import { test as base } from "@playwright/test";
import { HomePage } from "../../app/pages/HomePage";
import { SearchResultsPage } from "../../app/pages/SearchResultsPage";
import { CatalogPage } from "../../app/pages/CatalogPage";
import { StorageHelper } from "../../helpers/StorageHelper";
import fs from "fs";
import { FixtureHelper } from "../../helpers/FixtureHelper";
import { FavoritePage } from "../../app/pages/FavoritePage";

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
  favoritesPage: FavoritePage
};

export const test = base.extend<Pages>({
  storageState: async ({ request, baseURL }, use) => {
    const storageHelper = new StorageHelper();
    const fixtureHelper = new FixtureHelper();

    if (!baseURL) {
      throw new Error("baseURL is not defined");
    }

    if (!fs.existsSync(storageHelper.dirPath)) {
      fs.mkdirSync(storageHelper.dirPath, { recursive: true });
    }

    const requiresAuth = test.info().tags.includes("@loggedUser");

    if (requiresAuth) {
      if (storageHelper.isTokenExistsInCookies()) {
        if (!(await storageHelper.isTokenValid(request))) {
          await fixtureHelper.loginWithGoogleAuth(baseURL);
        }
      } else {
        await fixtureHelper.loginWithGoogleAuth(baseURL);
      }
    }

    if (!fs.existsSync(storageHelper.filePath)) {
      await fixtureHelper.storeCookiesState(baseURL);
    }

    await use(storageHelper.filePath);
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

  favoritesPage: async ({ page }, use) => {
    const favoritesPage = new FavoritePage(page);
    await use(favoritesPage);
  },
});
