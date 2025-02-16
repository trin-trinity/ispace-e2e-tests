import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { SearchResultsPageLocators } from "./SearchResultsPageLocators";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  get identifiableElement(): Locator {
    return this.locators.breadcrumb;
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

  async waitBreadcrumbLocatorToBeVisible() {
    await this.waitFor(this.getBreadCrumbLocator());
  }
 
  async waitProductLocatorToBeVisible() {
    const locator = this.getProductLocator().first();
    await this.waitFor(locator);
  }
}
