import type { TokenCache } from '@/storage/types';

// web supported alternative to mmkv
export const storage = localStorage;

export const tokenCache: TokenCache = {
  getToken: async (key: string): Promise<string | undefined | null> => {
    return localStorage.getItem(key);
  },
  saveToken: async (key: string, token: string): Promise<void> => {
    localStorage.setItem(key, token);
  },
  clearToken: (key: string): void => {
    localStorage.removeItem(key);
  },
};
