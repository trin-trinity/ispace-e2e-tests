// TODO: Зламано

import { Locator, Page } from "@playwright/test";

export class FavoritePageLocators {
  readonly title: Locator;

  constructor(page: Page) {
    this.title = page.locator('h1[class*="text-subtitle"]');
  }
}
