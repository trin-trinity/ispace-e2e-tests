import { Locator, Page } from "@playwright/test";
import { BasePage } from "@pages/base/BasePage";
import { SearchResultsPageLocators } from "./SearchResultsPageLocators";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  get identifiableElement(): Locator {
    return this.locators.productItem.first();
  }

  async waitProductItemToBeVisible() {
    const locator = this.locators.productItem.first();
    await this.waitFor(locator);
  }

  getHeaderTitle() {
    return this.locators.headerQuery;
  }

  getEmptyTextLocator() {
    return this.locators.emptyText;
  }

  getProductCountLocator() {
    return this.locators.productCount;
  }
}
