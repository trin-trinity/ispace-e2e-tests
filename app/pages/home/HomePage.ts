import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";
import { NavigationBar } from "@components/NavigationBar";
import { HomePageLocators } from "./HomePageLocators";
import { IPageAssertions } from "../base/IPageAssertions";
import { Cookies } from "@components/Cookies";

export class HomePage extends BasePage {
  navigationBar: NavigationBar;
  cookiesBar: Cookies;
  private locators: HomePageLocators;

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true,
  };

  constructor(page: Page) {
    super(page);

    this.navigationBar = new NavigationBar(page);
    this.cookiesBar = new Cookies(page);
    this.locators = new HomePageLocators(page);
  }

  get identifiableElement(): Locator {
    return this.locators.logo.first();
  }

  async navigateTo(url?: string) {
    await super.navigateTo(url, this.assertions);
  }
}
