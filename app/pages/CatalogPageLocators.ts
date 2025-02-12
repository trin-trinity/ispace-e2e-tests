import { Locator, Page } from "@playwright/test";

export class CatalogPageLocators {
  readonly showFiltersButton: Locator;

  constructor(page: Page) {
    this.showFiltersButton = page.locator(
      'button[class*="btn-filter-collapse"]'
    );
  }
}
