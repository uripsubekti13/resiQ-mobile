import { HttpService } from "../../core/http/http.service";
import { CONSTANT } from "../../constant/app.constant";

export class JNERestService {
  private get http() {
    return new HttpService(`http://apiv2.jne.co.id:10101/tracing/api/list/myjne/cnote`);
  }
  getTracking(cnote: string) {
    if (!cnote || cnote === "") throw `Connote can't be empty`;
    const data = `username=JNEONE&api_key=504fbae0d815bf3e73a7416be328fcf2`;

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return this.http.post(cnote, data, config).then((res: any) => {
      if (res && res.error) throw res.error;
      return res;
    });
  }
}
