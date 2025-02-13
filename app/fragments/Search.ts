import { Page } from "@playwright/test";
import { SearchLocators } from "./SearchLocators";

export class Search {
  private page: Page;
  private locators: SearchLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new SearchLocators(page);
  }

  getSuggestionLocator() {
    return this.locators.searchSuggestionButton;
  }

  async selectSearchSuggestion(suggestion: string) {
    await this.locators.searchSuggestionButton
      .getByText(suggestion, { exact: true })
      .click();
  }

  async searchForQuery(query: string) {
    await this.locators.searchField.fill(query);
    await this.page.keyboard.press("Enter");
  }
}
