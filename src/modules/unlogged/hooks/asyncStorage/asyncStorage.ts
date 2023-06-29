import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreKey = '@user' | '@token' | '@password';

interface IAsyncStorage {
  storeData: (key: StoreKey, value: any) => Promise<boolean>;
  readData: <T>(key: StoreKey) => Promise<T | undefined>;
  deleteData: (key: StoreKey) => Promise<boolean>;
}

export const useAsyncStorage = (): IAsyncStorage => {
  const storeData = async (key: StoreKey, value: any): Promise<boolean> => {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(key, json);
      return true;
    } catch (e) {
      return false;
    }
  };

  const readData = async <T>(key: StoreKey): Promise<T | undefined> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  };

  const deleteData = async (key: StoreKey): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };

  return {
    storeData,
    readData,
    deleteData,
  };
};
