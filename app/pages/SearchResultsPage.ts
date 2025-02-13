import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SearchResultsPageLocators } from "./SearchResultsPageLocators";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  getBreadCrumbLocator() {
    return this.locators.breadcrumb;
  }
  getDefaultInfoLocator() {
    return this.locators.defaultInfo;
  }
  getSearchResultsLocator() {
    return this.locators.searchResults;
  }
  getProductLocator() {
    return this.locators.product;
  }

  async waitBreadCrumbLocatorToBeVisible() {
    const locator = this.getBreadCrumbLocator();
    await locator.waitFor({ state: "visible", timeout: 10000 });
  }

  async waitProductLocatorToBeVisible() {
    const locator = this.getProductLocator().first();
    await locator.waitFor({ state: "visible", timeout: 10000 });
  }
}
