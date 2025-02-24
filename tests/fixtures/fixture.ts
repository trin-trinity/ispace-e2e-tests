import { test as base } from "@playwright/test";
import { HomePage } from "@pages/home/HomePage";
import { SearchResultsPage } from "@pages/SearchResultsPage";
import { CatalogPage } from "@pages/catalog/CatalogPage";
import { StorageHelper } from "@helpers/StorageHelper";
import fs from "fs";
import { FixtureHelper } from "@helpers/FixtureHelper";
import { FavoritePage } from "@pages/favorite/FavoritePage";
import { ProductDetailsPage } from "@pages/productDetails/ProductDetailsPage";
import { BasketPage } from "@pages/basket/BasketPage";

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
  favoritesPage: FavoritePage;
  productDetailsPage: ProductDetailsPage;
  basketPage: BasketPage;
};

export const test = base.extend<Pages>({
  storageState: async ({ request, baseURL }, use) => {
    const storageHelper = new StorageHelper();
    const fixtureHelper = new FixtureHelper();

    if (!baseURL) {
      throw new Error("baseURL is not defined");
    }

    try {
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
    } finally {
      const tokenFromCookie = storageHelper.getTokenFromCookie();
      if (tokenFromCookie) {
        if (
          await fixtureHelper.isBasketContainsProducts(request, tokenFromCookie)
        ) {
          await fixtureHelper.cleanUpUserCart(request, tokenFromCookie);
        }
      }
    }
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

  productDetailsPage: async ({ page }, use) => {
    const productDetailsPage = new ProductDetailsPage(page);
    await use(productDetailsPage);
  },

  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },

  page: async ({ page }, use) => {
    const consoleMessages: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      consoleMessages.push(text);
    });

    await use(page);

    for (const text of consoleMessages) {
      if (text.includes("the server responded with a status of 500")) {
        throw new Error(`Console error found: ${text}`);
      }
    }
  },
});
