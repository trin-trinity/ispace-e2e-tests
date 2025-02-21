import { Page } from "@playwright/test";
import { BaseView } from "../pages/base/BaseView";
import { AuthPopUp } from "../components/AuthPopUp";

export class UserIcon extends BaseView {
  authPopUp: AuthPopUp;
  constructor(page: Page) {
    super(page);

    this.authPopUp = new AuthPopUp(page);
  }
}
