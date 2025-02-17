import { expect, Locator, Page } from "@playwright/test";
import { IPageAssertions } from "./IPageAssertions";
import { BaseView } from "./BaseView";

export abstract class BasePage extends BaseView {
  abstract get identifiableElement(): Locator;

  protected async navigateTo(url: string = "/", assertions?: IPageAssertions) {
    await this.page.goto(url);

    if (assertions?.waitForIdentifiableElement) {
      this.waitFor(this.identifiableElement);
    }

    if (assertions?.waitForResponseUrl) {
      const url = assertions?.waitForResponseUrl;
      await this.page.waitForResponse(url);
    }
  }
}
