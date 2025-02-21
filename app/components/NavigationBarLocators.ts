import { Locator, Page } from "@playwright/test";

export class NavigationBarLocators {
  readonly searchButton: Locator;
  readonly userIcon: Locator;

  constructor(page: Page) {
    this.searchButton = page
      .locator("#mobile-menu")
      .locator('button[class*="header-search"]');

    // I know, this locator is awful. But otherwise it is impossible to find it.
    this.userIcon = page.locator(
      ".tool-list-item > .tool-item > .icon-wrapper > svg > path"
    );
  }
}
