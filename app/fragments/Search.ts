// TODO: Зламано

import { Page } from "@playwright/test";
import { SearchLocators } from "./SearchLocators";
import { BaseView } from "../pages/base/BaseView";

export class Search extends BaseView {
  private locators: SearchLocators;

  constructor(page: Page) {
    super(page);
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
