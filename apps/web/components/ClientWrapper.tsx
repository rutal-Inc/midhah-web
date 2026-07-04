"use client";
import parseJwt from "@midhah/utils/decodeJWT";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import { useEffect } from "react";

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
