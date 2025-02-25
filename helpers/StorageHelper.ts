import { APIRequestContext, BrowserContext } from "playwright/test";
import { isTokenExpired } from "@api/utils/AuthUtils";
import fs from "fs";
import path from "path";

export class StorageHelper {
  dirPath = path.resolve("tests", ".session");
  filePath = path.join(this.dirPath, `/state.json`);

  getTokenFromCookie(domainFilter?: string): string | null {
    try {
      const content = fs.readFileSync(this.filePath, "utf8");
      const state = JSON.parse(content);

      if (!Array.isArray(state.cookies)) {
        return null;
      }

      const authCookie = state.cookies.find((cookie: any) => {
        if (cookie.name !== "Auth-token") return false;
        if (domainFilter && cookie.domain) {
          return cookie.domain.includes(domainFilter);
        }
        return true;
      });

      if (authCookie?.value) {
        return decodeURIComponent(authCookie.value);
      }
    } catch {
      return null;
    }

    return null;
  }

  isTokenExistsInCookies() {
    try {
      return this.getTokenFromCookie() !== null;
    } catch {
      return false;
    }
  }

  async isTokenValid(request: APIRequestContext) {
    const token = this.getTokenFromCookie();

    if (token === null) {
      throw new Error("The auth token is not defined in cookies");
    }
    const isExpired = await isTokenExpired(request, token);
    return !isExpired;
  }

  async saveStorageState(context: BrowserContext) {
    await context.storageState({ path: this.filePath });
  }
}
