import axios from "axios";
import { create } from "zustand";

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
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ accessToken: null });
    }
  },
}));
