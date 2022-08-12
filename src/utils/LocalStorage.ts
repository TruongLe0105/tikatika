import { AsyncStorage } from "react-native";


export class LocalStorage {
  static async set(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log("ERROR SET LOCALSTORAGE", e);
    }
  }

  static async get(key: string): Promise<string> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch (e) {
      console.log("ERROR GET LOCALSTORAGE", e);
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.log("ERROR REMOVE LOCALSTORAGE", e);
    }
  };
}
