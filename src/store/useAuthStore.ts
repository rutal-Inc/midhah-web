import { create } from "zustand";
import { persist } from "zustand/middleware";
import parseJwt from "../utilities/decodeJWT";
import { useUserStore } from "./useUserStore";

interface AuthState {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  clearAuthToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authToken: null,
      setAuthToken: (token) => {
        set({ authToken: token });

        if (token) {
          const decodedUser = parseJwt(token);
          useUserStore.getState().setUser(decodedUser);
        } else {
          useUserStore.getState().setUser(null);
        }
      },
      clearAuthToken: () => {
        useUserStore.getState().setUser(null);
        set({ authToken: null });
      },
    }),
    {
      name: "authToken",
      partialize: (state) => ({
        authToken: state.authToken,
      }),
    },
  ),
);
