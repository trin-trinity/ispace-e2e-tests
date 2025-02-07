import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async navigateTo(url?: string) {
    url = url || "/";
    
    await this.page.goto(url);
  }
}
