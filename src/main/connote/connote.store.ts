import { observable } from "mobx";
import {
  jneRestService,
  jntRestService,
  posRestService,
  sicepatRestService,
  tikiRestService,
  wahanaRestService
} from "../../services/rest";
import { ImageSourcePropType, Alert } from "react-native";
import { images } from "../../assets";
import { detailStore, Detail } from "../detail/detail.store";
import * as _ from "lodash";
import navigationService from "../../services/navigation.service";
import { storage } from "../storage/storage";

export interface Expedition {
  id: string;
  name: string;
  logo: ImageSourcePropType;
  onSearch: ((cnote: string) => void) | undefined;
}
class ConnoteStore {
  @observable expeditions: Expedition[] = [];
  @observable selectedExpedition: Expedition | null = null;
  @observable isLoading: boolean = false;

  public async getExpeditions() {
    const data = [
      {
        id: "jne",
        name: "JNE",
        logo: images.expedition.jne,
        onSearch: async (cnote: string) => {
          try {
            this.isLoading = true;
            const result = await jneRestService.getTracking(cnote);
            if (result) {
              const data: Detail = {
                main: undefined,
                timeline: undefined
              };
              if (result.detail) {
                let receiverAddressArray = [];
                if (result.detail[0].cnote_receiver_addr1) {
                  receiverAddressArray.push(result.detail[0].cnote_receiver_addr1);
                }
                if (result.detail[0].cnote_receiver_addr2) {
                  receiverAddressArray.push(result.detail[0].cnote_receiver_addr2);
                }
                if (result.detail[0].cnote_receiver_addr3) {
                  receiverAddressArray.push(result.detail[0].cnote_receiver_addr3);
                }
                if (result.detail[0].cnote_receiver_city) {
                  receiverAddressArray.push(result.detail[0].cnote_receiver_city);
                }

                data.main = {
                  date: _.get(result, "detail[0].cnote_date", undefined),
                  cnote: _.get(result, "detail[0].cnote_no", undefined),
                  shipper: _.get(result, "detail[0].cnote_shipper_name", undefined),
                  shipperAddress: _.get(result, "detail[0].cnote_shipper_city", undefined),
                  receiver: _.get(result, "detail[0].cnote_receiver_name", undefined),
                  receiverAddress: receiverAddressArray.join(". ")
                };
              }
              if (result.history) {
                data.timeline = result.history.map((h: { date: string; desc: string }) => {
                  return {
                    title: h.date,
                    description: h.desc
                  };
                });
              }
              detailStore.result = data;
              await storage.add({ cnote, expeditionId: "jne" });
              navigationService.navigate("Detail");
            }
            return result;
          } catch (error) {
            const err =
              typeof error === "string" ? error : typeof error === "object" ? JSON.stringify(error) : "Unknown Error";
            Alert.alert("Warning !", err);
          } finally {
            this.isLoading = false;
          }
        }
      },
      {
        id: "jnt",
        name: "J&T",
        logo: images.expedition.jnt,
        onSearch: async (cnote: string) => {
          try {
            this.isLoading = true;
            const result: any = await jntRestService.getTracking(cnote);
            const data: Detail = {
              main: undefined,
              timeline: undefined
            };
            if (result && result.billCode) {
              data.main = {
                cnote: result.billCode
              };
              if (result && result.details) {
                data.timeline = result.details.map((d: any) => {
                  return {
                    title: d.acceptTime,
                    description: `${d.city}\n${d.state}\n[${d.scanstatus} ${
                      d.signer === "" ? d.deliveryName : d.signer
                      }]`
                  };
                });
              }
              detailStore.result = data;
              await storage.add({ cnote, expeditionId: "jnt" });
              navigationService.navigate("Detail");
            }
          } catch (error) {
            Alert.alert("Warning !", error);
          } finally {
            this.isLoading = false;
          }
        }
      },
      {
        id: "pos",
        name: "POS",
        logo: images.expedition.pos,
        onSearch: async (cnote: string) => {
          try {
            this.isLoading = true;
            const result = await posRestService.getTracking(cnote);
            const data: Detail = {
              main: undefined,
              timeline: undefined
            };
            if (result && result.data && result.data.resi) {
              data.main = { cnote: result.data.resi };
            }
            if (result && result.riwayat && result.riwayat.length > 0) {
              data.timeline = result.riwayat.map(r => {
                const description = r.lokasi
                  .split("- ")
                  .filter(l => l !== "")
                  .join("\n");
                return {
                  title: r.tanggal,
                  description
                };
              });
            }
            detailStore.result = data;
            await storage.add({ cnote, expeditionId: "pos" });
            navigationService.navigate("Detail");
          } catch (error) {
            Alert.alert("Warning !", error);
          } finally {
            this.isLoading = false;
          }
        }
      },
      {
        id: "sicepat",
        name: "SICEPAT",
        logo: images.expedition.sicepat,
        onSearch: async (cnote: string) => {
          try {
            this.isLoading = true;
            const result = await sicepatRestService.getTracking(cnote);
            const data: Detail = {
              main: undefined,
              timeline: undefined
            };
            if (result && result.data) {
              data.main = {
                cnote: result.data.awb,
                date: result.data.tanggal
              };
            }
            if (result && result.data2) {
              data.main = Object.assign(data.main, {
                shipper: result.data2.pengirim,
                shipperAddress: result.data2.alamat_pengirim,
                receiver: result.data2.penerima,
                receiverAddress: result.data2.alamat_penerima
              });
            }
            if (result && result.riwayat && result.riwayat.length > 0) {
              data.timeline = result.riwayat.map(r => {
                return {
                  title: r.tanggal,
                  description: r.keterangan
                };
              });
            }
            detailStore.result = data;
            await storage.add({ cnote, expeditionId: "sicepat" });
            navigationService.navigate("Detail");
          } catch (error) {
            Alert.alert("Warning !", error);
          } finally {
            this.isLoading = false;
          }
        }
      },
      {
        id: "tiki",
        name: "TIKI",
        logo: images.expedition.tiki,
        onSearch: async (cnote: string) => {
          try {
            this.isLoading = true;
            const result = await tikiRestService.getTracking(cnote);
            const data: Detail = {
              main: undefined,
              timeline: undefined
            };
            if (result && result.details) {
              data.main = {
                cnote: result.details.waybill_number,
                date: result.details.waybill_time.replace("Dikirim:   ", ""),
                shipper: result.details.shippper_name,
                shipperAddress: result.details.shipper_city,
                receiver: result.details.receiver_name,
                receiverAddress: result.details.receiver_city
              };
            }
            if (result && result.history && result.history.length > 0) {
              data.timeline = result.history.map(h => {
                return {
                  title: h.waktu,
                  description: `${h.keterangan}\n${h.tempat}`
                };
              });
            }
            detailStore.result = data;
            await storage.add({ cnote, expeditionId: "tiki" });
            navigationService.navigate("Detail");
          } catch (error) {
            Alert.alert("Warning !", error);
          } finally {
            this.isLoading = false;
          }
        }
      },
      {
        id: "wahana",
        name: "WAHANA",
        logo: images.expedition.wahana,
        onSearch: async (cnote: string) => {
          try {
            this.isLoading = true;
            const result = await wahanaRestService.getTracking(cnote);
            const data: Detail = {
              main: undefined,
              timeline: undefined
            };
            if (result && result.data) {
              data.main = {
                cnote: result.data.no,
                date: result.data.tanggal,
                shipper: result.data.pengirim,
                receiver: result.data.tujuan,
                receiverAddress: result.data.kota_tujuan
              };
            }
            if (result && result.riwayat && result.riwayat.length > 0) {
              data.timeline = result.riwayat.map(r => {
                return {
                  title: r.tanggal,
                  description: r.keterangan
                };
              });
            }
            detailStore.result = data;
            await storage.add({ cnote, expeditionId: "wahana" });
            navigationService.navigate("Detail");
          } catch (error) {
            Alert.alert("Warning !", error);
          } finally {
            this.isLoading = false;
          }
        }
      }
    ];
    if (data && data.length > 0) {
      this.expeditions = data;
      this.selectedExpedition = data[0];
    }
  }
}

export const connoteStore = new ConnoteStore();
