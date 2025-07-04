import { Page } from "@playwright/test";
import { Search } from "@fragments/Search";
import { NavigationBarLocators } from "./NavigationBarLocators";
import { BaseView } from "@pages/base/BaseView";
import { UserIcon } from "@fragments/UserIcon";

export class NavigationBar extends BaseView {
  userIcon: UserIcon;
  search: Search;
  private locators: NavigationBarLocators;

  constructor(page: Page) {
    super(page);

    this.locators = new NavigationBarLocators(page);
    this.search = new Search(page);
    this.userIcon = new UserIcon(page);
  }

  async clickSearchIcon() {
    await this.locators.searchIcon.click();
  }

  async clickUserIcon() {
    await this.locators.userIcon.click();
  }

  async awaitFavoritesIcon() {
    await this.waitFor(this.locators.favoritesIcon);
  }

  async clickFavoritesIcon() {
    await this.locators.favoritesIcon.click();
  }
}
