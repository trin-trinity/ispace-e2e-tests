import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { NavigationBar } from "../components/NavigationBar";

export class HomePage extends BasePage {
  navigationBar: NavigationBar;

  constructor(page: Page) {
    super(page);

    this.navigationBar = new NavigationBar(page);
  }

  async navigateTo() {
    await super.navigateTo("https://ispace.ua/ua/");
  }

  private async getRandomSuggestion() {
    const suggestions: string[] = [];

    const searchSuggestions = await this.navigationBar.search
      .getSuggestionLocator()
      .all();

    for (const suggestion of searchSuggestions) {
      const text = await suggestion.textContent();
      
      if (text !== null) {
        suggestions.push(text);
      }
    }

    const i = Math.floor(Math.random() * suggestions.length);
    const randomSuggestion = suggestions[i];

    return randomSuggestion;
  }

  async selectRandomSearchSuggestion() {
    const randomSuggestion = await this.getRandomSuggestion();

    await this.navigationBar.search.selectSearchSuggestion(randomSuggestion);
    return randomSuggestion
  }

  extractWords(text: string): string[] {
    return text.split(/\s+/).filter(Boolean);
  }
}
