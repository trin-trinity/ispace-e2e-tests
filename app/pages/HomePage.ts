import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavigationBar } from "../components/NavigationBar";

export class HomePage extends BasePage {
  navigationBar: NavigationBar;

  constructor(page: Page) {
    super(page);

    this.navigationBar = new NavigationBar(page)
  }

  async navigateTo() {
    await super.navigateTo("https://ispace.ua/ua/");
  }
}
