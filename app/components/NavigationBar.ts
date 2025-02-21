// TODO: Зламано

import { Page } from "@playwright/test";
import { Search } from "../fragments/Search";
import { NavigationBarLocators } from "./NavigationBarLocators";
import { BaseView } from "../pages/base/BaseView";
import { UserIcon } from "../fragments/UserIcon";

export class NavigationBar extends BaseView {
  private locators: NavigationBarLocators;
  userIcon: UserIcon;

  search: Search;
  constructor(page: Page) {
    super(page);

    this.locators = new NavigationBarLocators(page);
    this.search = new Search(page);
    this.userIcon = new UserIcon(page);
  }

  async clickSearchButton() {
    await this.locators.searchButton.click();
  }

  async clickUserIcon() {
    await this.locators.userIcon.click();
  }
}
