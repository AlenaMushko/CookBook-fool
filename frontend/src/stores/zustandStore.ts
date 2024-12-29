import { LOCAL_STORAGE } from "@constants/localStorage";
import { LocalStorageUtils } from "@utils/LocalStorage";
import { create } from "zustand";

interface AppState {
  accessToken: string | null;
  refreshToken: string | null;
  userName: string | null;
  isAuthenticated: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUserName: (userName: string) => void;
  clearAuth: () => void;

  language: "en" | "uk";
  setLanguage: (language: "en" | "uk") => void;
}

export const useAppStore = create<AppState>((set) => ({
  accessToken: LocalStorageUtils.getItem(LOCAL_STORAGE.ACCESS_TOKEN),
  refreshToken: LocalStorageUtils.getItem(LOCAL_STORAGE.REFRESH_TOKEN),
  userName: LocalStorageUtils.getItem(LOCAL_STORAGE.USER_NAME),
  isAuthenticated: !!LocalStorageUtils.getItem(LOCAL_STORAGE.ACCESS_TOKEN),

  setTokens: (accessToken, refreshToken) => {
    LocalStorageUtils.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    LocalStorageUtils.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    set({
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  setUserName: (userName: string) => {
    LocalStorageUtils.setItem(LOCAL_STORAGE.USER_NAME, userName);
    set({ userName });
  },

  clearAuth: () => {
    LocalStorageUtils.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
    LocalStorageUtils.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
    LocalStorageUtils.removeItem(LOCAL_STORAGE.USER_NAME);
    set({
      accessToken: null,
      refreshToken: null,
      userName: null,
      isAuthenticated: false,
    });
  },

  language: "en",
  setLanguage: (language) => set({ language }),
}));
