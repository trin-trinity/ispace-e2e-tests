import { Request } from "@api/base/Request";
import { APIRequestContext } from "@playwright/test";

export class ProfileController extends Request {
  private authToken: string;
    
    constructor(request: APIRequestContext, authToken: string) {
      super(request);
      this.authToken = authToken;
    }
  
  async getProfileInfoStatus(): Promise<number> {
    const response = await this.request.get("https://ispace.ua/api/profile", {
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  
    return response.status();
  }
}
