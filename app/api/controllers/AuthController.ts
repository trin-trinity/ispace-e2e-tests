import { Request } from "../base/Request";
import { AuthRequest, AuthResponse } from "../models/Auth";

export class AuthController extends Request {
  async login(data: AuthRequest) {
    const response = await this.request.post(
      "https://ispace.ua/ua/api/apr/login/",
      {
        data: data,
      }
    );

    const authResponse: AuthResponse = await response.json();
    return authResponse;
  }
}
