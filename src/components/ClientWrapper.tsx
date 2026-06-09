"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import parseJwt from "../utilities/decodeJWT";

export default function ClientWrapper() {
  const { accessToken } = useAuthStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (accessToken) {
      const decodedUser = parseJwt(accessToken);
      setUser(decodedUser);
    } else {
      setUser(null);
    }
  }, [accessToken, setUser]);

  return null;
}
