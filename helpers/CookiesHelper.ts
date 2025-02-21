import fs from "fs";
import { APIRequestContext, chromium } from "playwright/test";
import { isAuthTokenExpired as isTokenExpired } from "../app/api/utils/auth";
import { Cookies } from "../app/components/Cookies";
import { NavigationBar } from "../app/components/NavigationBar";
import { AuthPopUp } from "../app/components/AuthPopUp";
import { HomePage } from "../app/pages/HomePage";

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

  isTokenExistsInCookies(): boolean {
    return this.getTokenFromCookie() !== null;
  }

  async isTokenValid(request: APIRequestContext): Promise<boolean> {
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
    const homePage = await new HomePage(page)

    const cookies = new Cookies(page);
    const navBar = new NavigationBar(page);
    const authPopUp = new AuthPopUp(page);

    await page.goto(baseURL);

    await cookies.clickAgreeButton();
    await navBar.clickUserIcon();

    await authPopUp.clickGoogleAuth();
    await authPopUp.waitForEmailField();
    await authPopUp.fillEmailField(process.env.EMAIL as string);
    await authPopUp.clickNextButton();
    await authPopUp.waitForPassWindow();
    await authPopUp.fillPassField(process.env.PASSWORD as string);
    await authPopUp.clickNextButton();

    await page.waitForURL(baseURL);
    await page.context().storageState({ path: this.filePath });

    // const agreeButton = page
    //   .locator('[class*="cookies-container"] button')
    //   .first();
    // await agreeButton.click();

    /// click google auth method
    // await page
    //   .locator(".tool-list-item > .tool-item > .icon-wrapper > svg > path")
    //   .click();

    // await page
    //   .locator('[id="\\30 "]')
    //   .getByRole("listitem")
    //   .getByRole("button")
    //   .click();

    // // auth in google window
    // await page.waitForSelector('input[type="email"]');
    // await page.fill('input[type="email"]', process.env.EMAIL as string);
    // await page.click("#identifierNext");
    // await page.waitForSelector('input[type="password"]');
    // await page.fill('input[type="password"]', process.env.PASSWORD as string);
    // await page.waitForSelector("#passwordNext");
    // await page.click("#passwordNext");
  }

  async storeCookiesState(baseURL: string) {
    const browser = await chromium.launch({
      // TODO: remove after debug
      headless: false,
      args: ["--disable-blink-features=AutomationControlled"],
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseURL);
    const cookies = new Cookies(page);
    await cookies.clickAgreeButton();
    await page.context().storageState({ path: this.filePath });

    // const agreeButton = page
    //   .locator('[class*="cookies-container"] button')
    //   .first();
    // await agreeButton.click();
  }
}
