import { Locator, Page } from "@playwright/test";

export class NavigationBarLocators {
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.searchButton = page
      .locator("#mobile-menu")
      .locator('button[class*="header-search"]');
  }
}