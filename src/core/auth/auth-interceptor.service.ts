import Axios, { AxiosInstance, AxiosPromise, AxiosStatic } from "axios";
import * as _ from "lodash";
import { authStorageService } from "./auth-storage.service";
import { AuthenticationHttpService } from "./auth-http.service";

class AuthInterceptorService {
  timeout: number = 10000;

  setInterceptors(axios: AxiosInstance | AxiosStatic) {
    axios.interceptors.request.use(async request => {
      const accessToken = await authStorageService.accessToken();
      if (accessToken) {
        request.headers.common.Authorization = `Bearer ${accessToken}`;
      }
      return request;
    });

    axios.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const authHttp = new AuthenticationHttpService();
        const response = error.response;
        if (
          response &&
          response.status === 401 &&
          response.config &&
          response.config.headers &&
          response.config.headers.Authorization
        ) {
          try {
            const { accessToken } = await authHttp.refreshToken();
            await authStorageService.setAccessToken(accessToken);
            response.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(response.config);
          } catch (error) {
            throw error;
          }
        }
        throw error;
      }
    );
  }
}

export const authInterceptorService = new AuthInterceptorService();
