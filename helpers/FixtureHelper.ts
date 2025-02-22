import { chromium } from "playwright/test";
import { HomePage } from "../app/pages/HomePage";
import { StorageHelper } from "./StorageHelper";

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

      await page.waitForURL(url);
      await storage.saveStorageState(page.context());
    } finally {
      await browser.close();
    }
  }
}
