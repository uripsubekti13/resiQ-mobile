import { HttpService } from "../../core/http/http.service";
import { CONSTANT } from "../../constant/app.constant";
import * as _ from "lodash";
interface POS {
  status: string;
  pesan: string;
  data: {
    resi: string;
    layanan: string;
    tanggal: string;
    pengirim: string;
    alamat_pengirim: string;
    penerima: string;
    alamat_penerima: string;
  };
  riwayat: Riwayat[];
}
interface Riwayat {
  status: string;
  lokasi: string;
  tanggal: string;
  keterangan: string;
}
const NOTING = `Data kiriman tidak adaatau kiriman tersebut > 6 bulan sejak tanggal posting loket,silakan menghubungi customer care kami untuk pencarian kiriman lebih dalam.`;
export class POSRestService {
  private get http() {
    return new HttpService(`http://ayiip.com/tracking/pos.php`);
  }
  getTracking(cnote: string): Promise<POS> {
    if (!cnote || cnote === "") throw `Connote can't be empty`;

    return this.http
      .get("", {
        params: {
          resi: cnote
        }
      })
      .then((res: any) => {
        const resp: POS = res;
        if (resp.riwayat[0].lokasi === NOTING)
          throw `Resi tidak ditemukan atau sudah lebih dari 6 bulan sejak dikeluarkan`;
        return res;
      });
  }
}
