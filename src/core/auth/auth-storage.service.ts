import AsyncStorage from "@react-native-community/async-storage";
import { observable } from "mobx";

const ACCESS_TOKEN_KEY = "ACCESS:TOKEN:KEY";
const CREDENTIALS_KEY = "CREDENTIALS:KEY";
export interface Credentials {
  email: string;
  password: string;
}

class AuthStorageService {
  @observable private _accessToken: string | null = null;
  @observable private _credentials: Credentials | null = null;

  public async accessToken() {
    return this._accessToken ? this._accessToken : await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  }

  public async credentials() {
    const credentialsString = await AsyncStorage.getItem(CREDENTIALS_KEY);
    const credentials = credentialsString ? JSON.parse(credentialsString) : null;
    return this._credentials ? this._credentials : credentials;
  }

  public async setAccessToken(accessToken: string) {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    this._accessToken = accessToken;
  }

  public async setCredentials(credentials: Credentials) {
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials));
    this._credentials = credentials;
  }

  public async logout() {
    this._accessToken = null;
    this._credentials = null;
    await AsyncStorage.multiRemove([CREDENTIALS_KEY, ACCESS_TOKEN_KEY]);
  }
}

export const authStorageService = new AuthStorageService();
