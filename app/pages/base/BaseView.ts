import { expect, Locator, Page } from "@playwright/test";

export abstract class BaseView {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async waitFor(locator: Locator) {
    await expect(locator).toBeVisible();
    await expect(locator).not.toHaveJSProperty("naturalWidth", 0);
  }
}
