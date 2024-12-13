import type { TokenCache } from '@/storage/types';
import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const encryptionKey = Platform.select({
  native: process.env.EXPO_PUBLIC_MMKV_ENCRYPTION_KEY,
  default: undefined,
});

export const storage = new MMKV({
  id: 'jeopardytime-storage',
  encryptionKey,
});

export const clearStorage = () => {
  storage.clearAll();
};

export const tokenCache: TokenCache = {
  getToken: async (key: string): Promise<string | undefined | null> => {
    try {
      return storage.getString(key);
    } catch (err) {
      console.error('Error getting token from storage:', err);
      return null;
    }
  },

  saveToken: async (key: string, token: string): Promise<void> => {
    try {
      storage.set(key, token);
    } catch (err) {
      console.error('Error saving token to storage:', err);
    }
  },
  clearToken: (key: string): void => {
    try {
      storage.delete(key);
    } catch (err) {
      console.error('Error deleting token from storage:', err);
    }
  },
};
