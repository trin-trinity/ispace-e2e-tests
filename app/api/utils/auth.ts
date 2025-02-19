import { APIRequestContext } from "@playwright/test";
import { AuthController } from "../controllers/AuthController";

export async function getAuthToken(request: APIRequestContext) {
  const authController = new AuthController(request);

  const authResponse = await authController.login({
    login: process.env.LOGIN as string,
    password: process.env.PASSWORD as string,
    slug: process.env.SLUG as string,
  });
  
  return authResponse.token;
}