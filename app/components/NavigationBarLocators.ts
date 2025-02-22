import { Locator, Page } from "@playwright/test";

export class NavigationBarLocators {
  readonly searchIcon: Locator;
  readonly userIcon: Locator;

  constructor(page: Page) {
    this.searchIcon = page
      .locator('[class*= "headerToolItem"] .container-size')
      .first();

    // I know, this locator is awful. But otherwise it is impossible to find it.
    this.userIcon = page.locator(
      ".tool-list-item > .tool-item > .icon-wrapper > svg > path"
    );
  }
}
