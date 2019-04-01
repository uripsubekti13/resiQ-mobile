import Axios from 'axios';

import { authInterceptorService } from '../auth/auth-interceptor.service';
import { BaseHttpService } from './base-http.service';

export class HttpInterceptedService extends BaseHttpService {
  constructor(baseURL: string) {
    super(Axios.create());
    this.axios.defaults.baseURL = baseURL;
    this.axios.defaults.timeout = 10000;
    authInterceptorService.setInterceptors(this.axios);
  }
}
