import { HttpService } from "../../core/http/http.service";
import { CONSTANT } from "../../constant/app.constant";
import * as _ from "lodash";

interface Data {
  bills?: Bill[];
}
interface Bill {
  billCode?: string;
  details?: any[];
  status?: string;
}
export class JNTRestService {
  private get http() {
    return new HttpService(`http://jk.jet.co.id:22234/jandt-app-ifd-web/router.do`);
  }
  getTracking(cnote: string) {
    if (!cnote || cnote === "") throw `Connote can't be empty`;
    const parameter = {
      parameter: {
        billCodes: cnote,
        lang: "id"
      }
    };

    const data = encodeURI(`method=order.massOrderTrack&data=${JSON.stringify(parameter)}&format=json&v=1.0`);

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Request-With": "XMLHttpRequest",
        Host: "jk.jet.co.id:22234"
      }
    };
    return this.http.post("", data, config).then((res: any) => {
      const data: Data = JSON.parse(res.data);
      if (
        !res
        || !data
        || !data.bills
        || (data.bills.length === 0)
        || (data.bills[0].details && (data.bills[0].details.length === 0))
      ) {
        throw `Connote note found`;
      }
      if (data.bills[0].details) data.bills[0].details = _.reverse(data.bills[0].details)
      return data.bills[0]
    });
  }
}
