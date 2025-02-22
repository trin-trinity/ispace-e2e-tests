import { Locator, Page } from "@playwright/test";

export class FilterLocators {
  readonly filterLabel: Locator;
  readonly checkbox: Locator;
  readonly collapseButton: Locator;

  constructor(page: Page) {
    this.filterLabel = page.locator("label");
    this.checkbox = page.locator('[type="checkbox"]');
    this.collapseButton = page.locator(".filter-header > .filter-icon");
  }
}