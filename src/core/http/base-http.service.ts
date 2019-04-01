import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CancelTokenStatic } from "axios";
import * as _ from "lodash";

export class BaseHttpService {
  constructor(public axios: AxiosInstance) {}

  public post<T>(url: string = "", data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return (this.axios.post(url, data, config) as AxiosPromise).catch(this.throwError).then(response => {
      return response.data;
    });
  }

  public put<T>(url: string = "", data?: any, config: AxiosRequestConfig = {}): Promise<T> {
    return (this.axios.put(url, data, config) as AxiosPromise).catch(this.throwError).then(response => {
      return response.data;
    });
  }

  public get<T>(url: string = "", config: AxiosRequestConfig = {}): Promise<T> {
    return (this.axios.get(url, config) as AxiosPromise).catch(this.throwError).then(response => {
      return response.data;
    });
  }

  public delete<T>(url: string = "", config: AxiosRequestConfig = {}): Promise<T> {
    return (this.axios.delete(url, config) as AxiosPromise).catch(this.throwError).then(response => {
      return response.data;
    });
  }

  throwError = (error: any) => {
    if (error && error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error;
    }
  };
}
