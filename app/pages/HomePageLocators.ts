// TODO: Зламано

import { Locator, Page } from "@playwright/test";

export class HomePageLocators {
  readonly logo: Locator;

  constructor(page: Page) {
    this.logo = page.locator('[class*="header-list-item logo"]');
  }
}
