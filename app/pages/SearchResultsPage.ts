import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  getHeaderLocator = () => this.locators.header;
  getHeaderText = async () => await this.locators.header.textContent();
}


class SearchResultsPageLocators {
  header: Locator
  
  constructor(page: Page) {
    this.header = page.locator("h1");
  }
}
