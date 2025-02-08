import test, { Locator, Page } from "@playwright/test";

export class SearchContainer {
  private page: Page;
  private locators: SearchContainerLocators;

  constructor(page: Page) {
    this.page = page;
    this.locators = new SearchContainerLocators(page);
  }

  async selectRandomSearchSuggestion(): Promise<string> {
    return await test.step("Select a random search suggestion", async () => {
      const searchSuggestions =
        await this.locators.searchSuggestionButton.all();
      const suggestions: string[] = [];

      for (const suggestion of searchSuggestions) {
        const text = await suggestion.textContent();
        if (text !== null) {
          suggestions.push(text);
        }
      }

      const i = Math.floor(Math.random() * suggestions.length);
      const selectedSuggestion = suggestions[i];

      await this.locators.searchSuggestionButton
        .getByText(selectedSuggestion, { exact: true })
        .click();

      return selectedSuggestion;
    });
  }

  async extractWords(text: string): Promise<string[]> {
    return await test.step("Extract keywords from selected suggestion", async () => {
      return text.split(/\s+/).filter(Boolean);
    });
  }

  async searchForQuery(query: string) {
    await test.step(`Search for a query: ${query}`, async () => {
      await this.locators.searchField.fill(query);
      await this.page.keyboard.press("Enter");
    });
  }
}

class SearchContainerLocators {
  searchSuggestionButton: Locator;
  searchField: Locator;

  constructor(page: Page) {
    this.searchSuggestionButton = page.locator('ul[class*="search-helper-list"] li a');
    this.searchField = page.locator('[type="text"][formcontrolname="searchControl"]').first()
  }
}
