import { HttpService } from "../../core/http/http.service";
import { CONSTANT } from "../../constant/app.constant";
import * as _ from "lodash";
interface TIKI {
  error: boolean;
  pesan: string;
  details: {
    service_code: string;
    waybill_number: string;
    waybill_time: string;
    shipper_city: string;
    shippper_name: string;
    receiver_name: string;
    receiver_city: string;
  };
  history: History[];
}
interface History {
  waktu: string;
  keterangan: string;
  tempat: string;
}

export class TikiRestService {
  private get http() {
    return new HttpService(`http://ayiip.com/tracking/tiki.php`);
  }
  getTracking(cnote: string): Promise<TIKI> {
    if (!cnote || cnote === "") throw `Connote can't be empty`;

    return this.http
      .get("", {
        params: {
          resi: cnote
        }
      })
      .then((res: any) => {
        const resp: TIKI = res;
        if (resp.error) throw `Resi tidak ditemukan`;
        if (resp.history && resp.history.length > 0) resp.history = _.reverse(resp.history);
        return res;
      });
  }
}
