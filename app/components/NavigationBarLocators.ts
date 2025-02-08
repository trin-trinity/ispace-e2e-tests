import { Locator, Page } from "@playwright/test";

export class NavigationBarLocators {
  searchButton: Locator;

  constructor(page: Page) {
    this.searchButton = page
      .locator("#mobile-menu")
      .locator('button[class*="header-search"]');
  }
}