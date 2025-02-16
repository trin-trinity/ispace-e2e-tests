import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base/BasePage";
import { NavigationBar } from "../components/NavigationBar";
import { RandomSelector } from "../../utils/RandomSelector";
import { HomePageLocators } from "./HomePageLocators";
import { IPageAssertions } from "./base/IPageAssertions";

export class HomePage extends BasePage {
  navigationBar: NavigationBar;
  private locators: HomePageLocators;

  private assertions: IPageAssertions = {
    waitForIdentifiableElement: true
  };

  constructor(page: Page) {
    super(page);

    this.navigationBar = new NavigationBar(page);
    this.locators = new HomePageLocators(page);
  }

  get identifiableElement(): Locator {
    return this.locators.sliderBanner.first();
  }

  async navigateTo(url?: string, assertions?: IPageAssertions) {
    await super.navigateTo(url, this.assertions);
  }

  async selectRandomSearchSuggestion() {
    const allSuggestions = await this.navigationBar.search
      .getSuggestionLocator()
      .all();
    const randomSuggestion = await RandomSelector.getRandomText(allSuggestions);

    await this.navigationBar.search.selectSearchSuggestion(randomSuggestion);
    return randomSuggestion;
  }

  extractWords(text: string): string[] {
    return text.split(/\s+/).filter(Boolean);
  }
}
