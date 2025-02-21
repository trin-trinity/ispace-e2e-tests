import { Page } from "@playwright/test";
import { Search } from "../fragments/Search";
import { NavigationBarLocators } from "./NavigationBarLocators";
import { BaseView } from "../pages/base/BaseView";

export class NavigationBar extends BaseView {
  private locators: NavigationBarLocators;

  search: Search;
  constructor(page: Page) {
    super(page);

    this.locators = new NavigationBarLocators(page);
    this.search = new Search(page);
  }

  async clickSearchButton() {
    await this.locators.searchButton.click();
  }

  async clickUserIcon() {
    await this.locators.userIcon.click();
  }
}
