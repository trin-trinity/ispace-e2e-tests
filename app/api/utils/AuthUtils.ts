import { APIRequestContext } from "@playwright/test";
import { ProfileController } from "@api/controllers/ProfileController";

export async function isTokenExpired(
  request: APIRequestContext,
  token: string
) {
  const profileController = new ProfileController(request);

  try {
    const status = await profileController.getProfileInfoStatus(token);
    return status !== 200;
  } catch (error) {
    return true;
  }
}
