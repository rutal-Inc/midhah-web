"use client";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import parseJwt from "../utilities/decodeJWT";

export default function ClientWrapper() {
  const { authToken } = useAuthStore();
  const { setUser } = useUserStore();

  useEffect(() => {
    if (authToken) {
      const decodedUser = parseJwt(authToken);
      setUser(decodedUser);
    } else {
      setUser(null);
    }
  }, [authToken, setUser]);

  return null;
}
