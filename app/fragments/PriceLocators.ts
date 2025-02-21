// TODO: Зламано

import { Locator, Page } from "@playwright/test";

export class PriceLocators {
  readonly section: Locator;

  constructor(page: Page) {
    this.section = page
      .locator('p:has-text("Ціна")')
      .locator("xpath=./ancestor::apr-sidenav-price-filter-item");
  }
}
