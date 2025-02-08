import { Locator, Page } from "@playwright/test";

export class SearchResultsPageLocators {
  header: Locator;
  defaultInfo: Locator;
  searchResults: Locator;

  constructor(page: Page) {
    this.header = page.locator("h1");
    this.defaultInfo = page.locator("p.default-info");
    this.searchResults = page.locator(
      ".search-wrapper .search-result-wrapper"
    );
  }
}
