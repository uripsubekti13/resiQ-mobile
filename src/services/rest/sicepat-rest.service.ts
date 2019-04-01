import { HttpService } from "../../core/http/http.service";
import { CONSTANT } from "../../constant/app.constant";
import * as _ from "lodash";
interface Sicepat {
  status: string;
  pesan: string;
  data: {
    awb: string;
    service: string;
    tanggal: string;
    origin: string;
    destination: string;
  };
  data2: {
    pengirim: string;
    alamat_pengirim: string;
    penerima: string;
    alamat_penerima: string;
  };
  riwayat: Riwayat[];
}
interface Riwayat {
  tanggal: string;
  keterangan: string;
}

export class SicepatRestService {
  private get http() {
    return new HttpService(`http://ayiip.com/sicepat.php`);
  }
  getTracking(cnote: string): Promise<Sicepat> {
    if (!cnote || cnote === "") throw `Connote can't be empty`;

    return this.http
      .get("", {
        params: {
          resi: cnote
        }
      })
      .then((res: any) => {
        const resp: Sicepat = res;
        if (resp.status === 'error')
          throw `Resi tidak ditemukan`;
        return res;
      });
  }
}
