import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SearchResultsPageLocators } from "./SearchResultsPageLocators";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  getHeaderLocator = () => this.locators.header;
  getDefaultInfoLocator = () => this.locators.defaultInfo;
  getSearchResultsLocator = () => this.locators.searchResults;
  getProductLocator = () => this.locators.product
  
  async waitForLocatorToBeVisible(locator: Locator) {
    await super.waitForLocatorToBeVisible(locator);
  }
}
