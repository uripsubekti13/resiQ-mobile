import { observable, toJS } from "mobx";
import AsyncStorage from "@react-native-community/async-storage";
import * as _ from "lodash";

const KEY = "RECENT";
export interface Recent {
  cnote: string;
  expeditionId: string;
}

class Storage {
  @observable recents: Recent[] = [];

  async init() {
    const recentsString = await AsyncStorage.getItem(KEY);
    this.recents = recentsString ? JSON.parse(recentsString) : [];
  }

  async add(recent: Recent) {
    const prevRecents = toJS(this.recents);
    // remove first
    const data = prevRecents.filter(pRecent => {
      return (pRecent.cnote !== recent.cnote) && (pRecent.expeditionId !== recent.expeditionId);
    });
    // add
    data.push(recent);
    this.recents = data;
    // add to AsyncStorage
    await AsyncStorage.setItem(KEY, JSON.stringify(data));
  }

  get jsRecents() {
      const recents = _.reverse(toJS(this.recents)).slice(0, 5);
      return recents;
  }

  async remove(recent: Recent) {
    this.recents = toJS(this.recents).filter((r) => (r.cnote !== recent.cnote) && (r.expeditionId !== recent.expeditionId));
    await AsyncStorage.setItem(KEY, JSON.stringify(toJS(this.recents)));
  }
}

export const storage = new Storage();
