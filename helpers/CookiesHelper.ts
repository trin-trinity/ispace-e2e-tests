import { APIRequestContext, chromium } from "playwright/test";
import { isTokenExpired } from "../app/api/utils/authUtils";
import { HomePage } from "../app/pages/HomePage";
import fs from "fs";

export class CookiesHelper {
  private filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }

  getTokenFromCookie(domainFilter?: string): string | null {
    try {
      const content = fs.readFileSync(this.filePath, "utf8");
      const state = JSON.parse(content);

      if (Array.isArray(state.cookies)) {
        const authCookie = state.cookies.find((cookie: any) => {
          if (cookie.name !== "Auth-token") return false;
          if (domainFilter) {
            return cookie.domain && cookie.domain.includes(domainFilter);
          }
          return true;
        });

        if (authCookie && authCookie.value) {
          return decodeURIComponent(authCookie.value);
        }
      }
    } catch (error) {
      throw new Error("Error extracting auth token:", error);
    }
    return null;
  }

  isTokenExistsInCookies() {
    return this.getTokenFromCookie() !== null;
  }

  async isTokenValid(request: APIRequestContext) {
    const token = this.getTokenFromCookie();

    if (token === null) {
      throw new Error("The auth token is not defined in cookies");
    }
    const isExpired = await isTokenExpired(request, token);
    return !isExpired;
  }

  async performFullAuthFlow(baseURL: string) {
    const browser = await chromium.launch({
      // TODO: remove after debug
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);

    await homePage.navigateTo(baseURL);
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

    await page.waitForURL(baseURL);
    await page.context().storageState({ path: this.filePath });
  }

  async storeCookiesState(baseURL: string) {
    const browser = await chromium.launch({
      // TODO: remove after debug
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const homePage = new HomePage(page);

    await homePage.navigateTo(baseURL);
    await homePage.cookiesBar.clickAgreeButton();
    await page.context().storageState({ path: this.filePath });
  }
}
