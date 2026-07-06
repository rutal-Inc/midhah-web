"use client";

import { useCollectionStore } from "@/store/useCollectionStore";
import api from "@midhah/utils/axios";
import { auth as firebaseAuth } from "@midhah/utils/firebase";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import { signOut } from "firebase/auth";
import { useCallback, useEffect } from "react";

function hasSessionCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((c) => c.startsWith("hasSession=true"));
}

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAccessToken, logout: clearAuth, setInitialized } = useAuthStore();
  const { setUser } = useUserStore();
  const { reset } = useCollectionStore();

  const fullLogout = useCallback(async () => {
    try {
      await signOut(firebaseAuth);
      clearAuth();
    } finally {
      setAccessToken(null);
      setUser(null);
      reset();
    }
  }, [clearAuth, setAccessToken, setUser, reset]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (
        globalThis.window !== undefined &&
        localStorage.getItem("authToken")
      ) {
        localStorage.removeItem("authToken");
        fullLogout();
      }

      if (!hasSessionCookie()) {
        setAccessToken(null);
        setUser(null);
        setInitialized(true);
        return;
      }

      try {
        const res = await api.post("/auth/refresh");

        const { accessToken } = res.data.data || res.data;

        if (accessToken) {
          setAccessToken(accessToken);
        }
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [setAccessToken, setUser, clearAuth, fullLogout, setInitialized]);

  return <>{children}</>;
}
