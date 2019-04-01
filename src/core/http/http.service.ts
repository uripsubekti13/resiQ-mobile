import Axios from 'axios';
import { BaseHttpService } from './base-http.service';

export class HttpService extends BaseHttpService {
  constructor(baseURL: string) {
    super(Axios.create());
    this.axios.defaults.baseURL = baseURL;
  }
}
