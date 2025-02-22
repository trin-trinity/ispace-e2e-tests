import { Locator, Page } from "@playwright/test";

export class SaleLocators {
  readonly section: Locator;
  readonly toggle: Locator;

  constructor(page: Page) {
    this.section = page.locator('[class*="discount-filter-checkbox"]');
    this.toggle = this.section.locator('[class*="custom-checkbox"]');
  }
}
