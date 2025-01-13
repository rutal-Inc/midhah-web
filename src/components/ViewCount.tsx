"use client";

import { useCallback, useEffect } from "react";

export default function ViewCount({
  entityId,
  referer,
}: {
  entityId: number;
  referer: string;
}) {
  const callApi = useCallback(async () => {
    if (process.env.NODE_ENV !== "production") return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entityId,
          entityType: "LYRICS",
          referrer: referer,
          client: "WEB",
        }),
      });
    } catch (error) {
      console.error("API call failed:", error);
    }
  }, [entityId, referer]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callApi();
    }, 10000);

    return () => clearTimeout(timer);
  }, [callApi]);

  return null;
}
