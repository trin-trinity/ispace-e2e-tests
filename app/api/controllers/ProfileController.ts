import { Request } from "../base/Request";

export class ProfileController extends Request {
  async getProfileInfoStatus(authToken: string): Promise<number> {
    const response = await this.request.get("https://ispace.ua/api/profile", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  
    return response.status();
  }
}
