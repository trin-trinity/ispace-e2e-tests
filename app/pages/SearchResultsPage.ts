import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { th } from "@faker-js/faker";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  getHeaderLocator = () => this.locators.header;
  getDefaultInfoLocator = () => this.locators.defaultInfo;
  getSearchResultsWrapperLocator = () => this.locators.searchResultsWrapper;
  getHeaderText = async () => await this.locators.header.textContent();
}


class SearchResultsPageLocators {
  header: Locator;
  defaultInfo: Locator;
  searchResultsWrapper: Locator

  constructor(page: Page) {
    this.header = page.locator("h1");
    this.defaultInfo = page.locator("p.default-info");
    this.searchResultsWrapper = page.locator(
      ".search-wrapper .search-result-wrapper"
    );
  }
}
