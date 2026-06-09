"use client";

import api from "@/src/lib/axios";
import { logout } from "@/src/service/auth";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useCollectionStore } from "@/src/store/useCollectionStore";
import { useUserStore } from "@/src/store/useUserStore";
import { auth as firebaseAuth } from "@/src/utilities/firebase";
import { signOut } from "firebase/auth";
import { useCallback, useEffect } from "react";
import Loader from "../Loader";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    setAccessToken,
    logout: clearAuth,
    isInitialized,
    setInitialized,
  } = useAuthStore();
  const { setUser } = useUserStore();
  const { reset } = useCollectionStore();

  const fullLogout = useCallback(async () => {
    try {
      await signOut(firebaseAuth);
      logout();
    } finally {
      clearAuth();
      setUser(null);
      reset();
    }
  }, [clearAuth, setUser, reset]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (
        globalThis.window !== undefined &&
        localStorage.getItem("authToken")
      ) {
        localStorage.removeItem("authToken");
        fullLogout();
      }

      try {
        const res = await api.post("/auth/refresh");

        const { accessToken } = res.data.data || res.data;

        if (accessToken) {
          setAccessToken(accessToken);
        }
      } catch {
        setUser(null);
        clearAuth();
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [setAccessToken, setUser, clearAuth, fullLogout, setInitialized]);

  if (!isInitialized) {
    return <Loader />;
  }

  return <>{children}</>;
}
