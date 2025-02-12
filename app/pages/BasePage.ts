import { ur } from "@faker-js/faker";
import { Locator, Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async navigateTo(url?: string) {
    url = url || "/";

    await this.page.goto(url);
  }

  protected async waitForLocatorToBeVisible(
    locator: Locator,
    timeout: number = 10000
  ) {
    await locator.waitFor({ state: "visible", timeout: timeout });
  }

  protected async waitForLoadState(
    state: "domcontentloaded" | "load" | "networkidle",
    timeout: number = 10000
  ) {
    await this.page.waitForLoadState(state, { timeout });
  }

  protected async waitForResponse(url: string) {
    await this.page.waitForResponse(url);
  }
}
