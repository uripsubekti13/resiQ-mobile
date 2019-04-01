import { HttpService } from "../../core/http/http.service";
import { CONSTANT } from "../../constant/app.constant";
import * as _ from "lodash";
interface Wahana {
  status: string;
  pesan: string;
  data: {
    no: string;
    tanggal: string;
    pengirim: string;
    tujuan: string;
    kota_tujuan: string;
    status: string
  };
  riwayat: Riwayat[];
}
interface Riwayat {
  tanggal: string;
  keterangan: string;
}

export class WahanaRestService {
  private get http() {
    return new HttpService(`http://ayiip.com/wahana.php`);
  }
  getTracking(cnote: string): Promise<Wahana> {
    if (!cnote || cnote === "") throw `Connote can't be empty`;

    return this.http
      .get("", {
        params: {
          resi: cnote
        }
      })
      .then((res: any) => {
        const resp: Wahana = res;
        if (resp.status === 'error')
          throw `Resi tidak ditemukan`;
        return res;
      });
  }
}
