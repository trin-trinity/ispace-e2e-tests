import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { SearchResultsPageLocators } from "./SearchResultsPageLocators";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  getBreadCrumbLocator = () => this.locators.breadcrumb;
  getDefaultInfoLocator = () => this.locators.defaultInfo;
  getSearchResultsLocator = () => this.locators.searchResults;
  getProductLocator = () => this.locators.product;

  waitBreadCrumbLocatorToBeVisible = async () => await super.waitForLocatorToBeVisible(this.getBreadCrumbLocator());
  waitProductLocatorToBeVisible = async () => await super.waitForLocatorToBeVisible(this.getProductLocator().first());
}
