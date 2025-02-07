import test, { Locator, Page } from "@playwright/test";
import { SearchContainer } from "./SearchContainer";


export class NavigationBar {
  private page: Page;
  private locators: NavigationBarLocators;

  searchContainer: SearchContainer;

  constructor(page: Page) {
    this.page = page;

    this.locators = new NavigationBarLocators(page)
    this.searchContainer = new SearchContainer(page);
  }

  async clickSearchButton() {
    await test.step("Click on search bar", async () => {
      await this.locators.searchButton.click();
    });
  }
}

class NavigationBarLocators {
  searchButton: Locator;

  constructor(page: Page) {
    this.searchButton = page
      .locator("#mobile-menu")
      .locator('button[class*="header-search"]');
  }
}
