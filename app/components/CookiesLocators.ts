import { Locator, Page } from "@playwright/test";

export class CookiesLocators {
  readonly agreeButton: Locator;

  constructor(page: Page) {
    this.agreeButton = page
      .locator('[class*="cookies-container"] button')
      .first();
  }
}
