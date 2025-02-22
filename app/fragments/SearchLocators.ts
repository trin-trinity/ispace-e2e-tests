import { Locator, Page } from "@playwright/test";

export class SearchLocators {
  readonly searchField: Locator;

  constructor(page: Page) {
    this.searchField = page.locator('[placeholder="Пошук"]');
  }
}
