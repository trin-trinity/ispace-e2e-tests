import { Locator, Page } from "@playwright/test";

export class SearchContainer {
  private page: Page;

  private searchSuggestionButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchSuggestionButton = page.locator(
      'ul[class*="search-helper-list"] li a'
    );
  }

  async selectRandomSearchSuggestion(): Promise<string> {
    const searchSuggestions = await this.searchSuggestionButton.all();
    const suggestions: string[] = [];

    for (const suggestion of searchSuggestions) {
      const text = await suggestion.textContent();
      if (text !== null) {
        suggestions.push(text);
      }
    }

    const i = Math.floor(Math.random() * suggestions.length);
    const selectedSuggestion = suggestions[i];

    await this.searchSuggestionButton
      .getByText(selectedSuggestion, { exact: true })
      .click();

    return selectedSuggestion;
  }

  extractWords(text: string): string[] {
    return text.split(/\s+/).filter(Boolean)
  }
}
  