"use client";
import { signOut } from "firebase/auth";
import { useEffect, useCallback } from "react";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import api from "@midhah/utils/axios";
import { auth as firebaseAuth } from "@midhah/utils/firebase";
import parseJwt from "@midhah/utils/decodeJWT";
import Loader from "../Loader";
import toast from "react-hot-toast";

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAccessToken, logout, isInitialized, setInitialized } =
    useAuthStore();
  const { setUser } = useUserStore();

  const fullLogout = useCallback(async () => {
    try {
      await signOut(firebaseAuth);
      await api.post("/auth/logout").catch(() => null);
    } finally {
      logout();
      setUser(null);
    }
  }, [logout, setUser]);

  useEffect(() => {
    const initializeAuth = async () => {
      const hasLegacyToken =
        typeof window !== "undefined" &&
        (localStorage.getItem("token") || localStorage.getItem("authToken"));

      if (hasLegacyToken) {
        localStorage.removeItem("token");
        toast.error("Unauthorized profile detected. Please log in.");
      }

      try {
        const res = await api.post("/auth/refresh");

        const { accessToken } = res.data.data || res.data;
        if (accessToken) {
          setAccessToken(accessToken);
          const decodedUser = parseJwt(accessToken);
          setUser(decodedUser);
        } else {
          setAccessToken(null);
          setUser(null);
        }
      } catch {
        setUser(null);
        logout();
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [setAccessToken, setUser, logout, fullLogout, setInitialized]);

  if (!isInitialized) {
    return <Loader />;
  }

  return <>{children}</>;
}
