// TODO: Зламано

import { Locator, Page } from "@playwright/test";

export class SearchLocators {
  readonly searchSuggestionButton: Locator;
  readonly searchField: Locator;

  constructor(page: Page) {
    this.searchSuggestionButton = page.locator(
      'ul[class*="search-helper-list"] li a'
    );
    this.searchField = page
      .locator('[type="text"][formcontrolname="searchControl"]')
      .first();
  }
}
