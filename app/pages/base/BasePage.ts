import { Locator } from "@playwright/test";
import { IPageAssertions } from "./IPageAssertions";
import { BaseView } from "./BaseView";

export abstract class BasePage extends BaseView {
  abstract get identifiableElement(): Locator;

  protected async navigateTo(url = "/", assertions?: IPageAssertions) {
    await this.page.goto(url);

    if (assertions?.waitForResponseUrl) {
      const url = assertions?.waitForResponseUrl;
      await this.page.waitForResponse(url);
    }

    if (assertions?.waitForIdentifiableElement) {
      await this.waitFor(this.identifiableElement)
    }
  }
}
