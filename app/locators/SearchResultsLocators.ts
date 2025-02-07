import { Locator, Page } from "@playwright/test";

export class SearchResultsPageLocators {
  private  header: Locator
  
  constructor(page: Page) {
    this.header = page.locator("h1");
  }

  getHeader = () => this.header
}