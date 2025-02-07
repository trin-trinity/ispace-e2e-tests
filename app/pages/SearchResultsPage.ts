import { Page } from "@playwright/test";
import { SearchResultsPageLocators } from "../locators/SearchResultsLocators";
import { BasePage } from "./BasePage";

export class SearchResultsPage extends BasePage {
  private locators: SearchResultsPageLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new SearchResultsPageLocators(this.page);
  }

  getHeaderLocator = () => this.locators.getHeader();

  getHeaderText = async () => await this.locators.getHeader().textContent();
}
