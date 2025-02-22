import { Locator, Page } from "@playwright/test";

export class NavigationBarLocators {
  readonly searchIcon: Locator;
  readonly userIcon: Locator;
  readonly favoritesIcon: Locator

  constructor(page: Page) {
    this.searchIcon = page
      .locator('[class*= "headerToolItem"] .container-size')
      .first();

    // I know, these locators are awful. But otherwise it is impossible to find it.
    this.userIcon = page.locator(
      ".tool-list-item > .tool-item > .icon-wrapper > svg > path"
    );

    this.favoritesIcon = page.locator(
      'button > [class*="headerToolItem"] [data-v-87e79380]'
    );
  }
}
