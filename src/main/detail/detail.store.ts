import { observable, toJS } from "mobx";

export interface Detail {
  main?: {
    cnote?: string;
    date?: string;
    shipper?: string;
    shipperAddress?: string;
    receiver?: string;
    receiverAddress?: string;
  };
  timeline?: Timeline[];
}
interface Timeline {
  time?: string;
  title?: string;
  description?: string;
}
class DetailStore {
  @observable result: Detail | null = null;
  get main() {
    return (this.result && this.result.main) ? toJS(this.result.main) : {}
}
  get timeline() {
      return (this.result && this.result.timeline) ? toJS(this.result.timeline) : []
  }
}
export const detailStore = new DetailStore();
