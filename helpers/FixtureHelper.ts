import { APIRequestContext, chromium } from "playwright/test";
import { HomePage } from "@pages/home/HomePage";
import { StorageHelper } from "./StorageHelper";
import { BasketController } from "@api/controllers/BasketController";
import { ur } from "@faker-js/faker/.";

export class FixtureHelper {
  async storeCookiesState(url: string) {
    const storage = new StorageHelper();

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);

    try {
      await homePage.navigateTo(url);
      await homePage.cookiesBar.clickAgreeButton();
      await storage.saveStorageState(page.context());
    } finally {
      await browser.close();
    }
  }

  async loginWithGoogleAuth(url: string) {
    const storage = new StorageHelper();

    const browser = await chromium.launch({
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);

    try {
      await homePage.navigateTo(url);
      await homePage.cookiesBar.clickAgreeButton();

      await homePage.navigationBar.clickUserIcon();
      await homePage.navigationBar.userIcon.authPopUp.clickGoogleAuth();

      await homePage.navigationBar.userIcon.authPopUp.waitForEmailField();
      await homePage.navigationBar.userIcon.authPopUp.fillEmailField(
        process.env.EMAIL as string
      );
      await homePage.navigationBar.userIcon.authPopUp.clickNextButton();
      await homePage.navigationBar.userIcon.authPopUp.waitForPassWindow();
      await homePage.navigationBar.userIcon.authPopUp.fillPassField(
        process.env.PASSWORD as string
      );
      await homePage.navigationBar.userIcon.authPopUp.clickNextButton();

      await page.waitForURL(url, { timeout: 50_000 });

      await storage.saveStorageState(page.context());
    } finally {
      await browser.close();
    }
  }
  async getBasketProducts(request: APIRequestContext, token: string) {
    const basketController = new BasketController(request, token);
    return basketController.getBasketProducts();
  }

  async isBasketContainsProducts(request: APIRequestContext, token: string) {
    const products = await this.getBasketProducts(request, token);
    if (products.length > 0) {
      return true;
    }
    return false;
  }

  async cleanUpUserCart(request: APIRequestContext, token: string) {
    const basketController = new BasketController(request, token);
    await basketController.deleteAllProductFromBasket();
  }
}
