import { HttpService } from "../http/http.service";
import { CONSTANT } from "../../constant/app.constant";
import { authStorageService, Credentials } from "./auth-storage.service";

interface LoginVM {
    accessToken: string;
}

export class AuthenticationHttpService {
  
  async refreshToken(): Promise<LoginVM> {
    const http = new HttpService(CONSTANT.BASE_URL);
    const credentials = await authStorageService.credentials()
    return http.post<any>("auth/login", credentials);
  }

  async login(credentials: Credentials): Promise<LoginVM> {
    const http = new HttpService(CONSTANT.BASE_URL);
    const result = await http.post<any>("auth/login", credentials);
    if (result && result.accessToken) {
      await authStorageService.setCredentials(credentials);
      await authStorageService.setAccessToken(result.accessToken);
    }
    return result;
  }

}
