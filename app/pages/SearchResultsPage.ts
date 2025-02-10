import { Page } from "@playwright/test";
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
  getHeaderText = async () => await this.locators.header.textContent();
  
  async waitForLoadState(): Promise<void> {
    super.waitForLoadState()
  }
}
