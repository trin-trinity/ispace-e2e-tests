import { Locator, Page } from "@playwright/test";

export class SearchResultsPageLocators {
  readonly productItem: Locator;
  readonly headerQuery: Locator;
  readonly emptyText: Locator;
  readonly productCount: Locator;

  constructor(page: Page) {
    this.productItem = page.locator(".card-grid-container");
    this.headerQuery = page.locator("h1 > q");
    this.emptyText = page.locator('[class*="not-found-main-text"]');
    this.productCount = page.locator('.align-center > [class*="text-body-4"]');
  }
}
