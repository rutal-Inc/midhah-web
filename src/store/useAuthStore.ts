import { create } from "zustand";
import api from "../lib/axios";

interface AuthState {
  accessToken: string | null;
  isInitialized: boolean; // Tells us if the first-load refresh check is done
  setAccessToken: (token: string | null) => void;
  setInitialized: (status: boolean) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  isInitialized: false,
  setAccessToken: (token) => set({ accessToken: token }),
  setInitialized: (status) => set({ isInitialized: status }),
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      // Clear token and reset initialization if needed
      set({ accessToken: null });
    }
  },
}));
