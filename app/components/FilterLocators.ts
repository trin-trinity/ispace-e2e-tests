import { Locator, Page } from "@playwright/test";

export class FilterLocators {
  readonly checkboxLabel: Locator;
  readonly checkbox: Locator;
  readonly showButton: Locator;
  readonly showAllButton: Locator;

  constructor(page: Page) {
    this.checkboxLabel = page.locator(".mat-checkbox-label");
    this.checkbox = page.locator(".mat-checkbox-inner-container");
    this.showButton = page.locator('[class*="filters-buttons"]>button[class*="filters"]');
    this.showAllButton = page.locator('button[class*="btn link-button"]');
  }
}
