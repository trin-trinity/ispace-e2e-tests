import test, { Page } from "@playwright/test";
import { SearchLocators } from "./SearchLocators";

export class Search {
  private page: Page;
  private locators: SearchLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new SearchLocators(page);
  }

  getSuggestionLocator = () => this.locators.searchSuggestionButton;
  getSearchFieldLocator = () => this.locators.searchField;
}
