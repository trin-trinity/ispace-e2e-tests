import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavigationBar } from "../components/NavigationBar";
import { RandomSelector } from "../../utils/RandomSelector";

export class HomePage extends BasePage {
  navigationBar: NavigationBar;

  constructor(page: Page) {
    super(page);

    this.navigationBar = new NavigationBar(page);
  }

  async navigateTo() {
    await super.navigateTo();
  }

  async selectRandomSearchSuggestion() {
    const allSuggestions = await this.navigationBar.search.getSuggestionLocator().all()
    const randomSuggestion = await RandomSelector.getRandomText(allSuggestions)

    await this.navigationBar.search.selectSearchSuggestion(randomSuggestion);
    return randomSuggestion
  }

  extractWords(text: string): string[] {
    return text.split(/\s+/).filter(Boolean);
  }
}
