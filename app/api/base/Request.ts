import { APIRequestContext } from "@playwright/test";

export abstract class Request {
  protected request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
}