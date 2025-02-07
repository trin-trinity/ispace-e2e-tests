import { Locator, Page } from "@playwright/test";
import { SearchContainer } from "./SearchContainer";

export class NavigationBar {
  private page: Page;
  private searchButton: Locator;
  
  searchContainer: SearchContainer;

  constructor(page: Page) {
    this.page = page;

    this.searchButton = page
      .locator("#mobile-menu")
      .locator('button[class*="header-search"]');

    this.searchContainer = new SearchContainer(page);
  }

  clickSearchButton = async () => await this.searchButton.click();
}
