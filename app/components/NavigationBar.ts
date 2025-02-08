import test, { Page } from "@playwright/test";
import { Search } from "../fragments/Search";
import { NavigationBarLocators } from "./NavigationBarLocators";

export class NavigationBar {
  private page: Page;
  private locators: NavigationBarLocators;

  search: Search;

  constructor(page: Page) {
    this.page = page;

    this.locators = new NavigationBarLocators(page);
    this.search = new Search(page);
  }

  async clickSearchButton() {
    await this.locators.searchButton.click();
  }
}
