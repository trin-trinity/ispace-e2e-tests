import { test as base } from "@playwright/test";
import { request } from "@playwright/test";
import { HomePage } from "../../app/pages/HomePage";
import { SearchResultsPage } from "../../app/pages/SearchResultsPage";
import { CatalogPage } from "../../app/pages/CatalogPage";
import { AuthController } from "../../app/api/controllers/AuthController";
import path from "path";

type Pages = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  catalogPage: CatalogPage;
};

type WorkerAuthState = {
  workerStorageState: string;
};

export const test = base.extend<Pages, WorkerAuthState>({
  storageState: async ({ workerStorageState }, use) => use(workerStorageState),

  workerStorageState: [
    async ({ browser }, use) => {
      const dirPath = path.resolve("tests", ".auth");
      const fileName = path.join(dirPath, `/token.json`);

      const browserContext = await browser.newContext();
      const page = await browserContext.newPage();
      await page.goto("https://ispace.ua/ua");

      const apiContext = await request.newContext();

      const authController = new AuthController(apiContext);
      const authResponse = await authController.login({
        login: process.env.LOGIN as string,
        password: process.env.PASSWORD as string,
        slug: process.env.SLUG as string,
      });

      await browserContext.addInitScript((token) => {
        localStorage.setItem("auth_token", token);
      }, authResponse.token);

      await page.reload();

      await browserContext.storageState({ path: fileName });
      await browserContext.close();
      await apiContext.dispose();
      await use(fileName);
    },
    { scope: "worker" },
  ],

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
