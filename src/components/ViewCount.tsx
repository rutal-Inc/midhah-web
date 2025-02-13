"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function ViewCount({
  entityId,
  referer,
}: {
  entityId: number;
  referer: string;
}) {
  const pathname = usePathname();

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
          referrer: referer.includes(pathname) ? undefined : referer,
          client: "WEB",
        }),
      });
    } catch (error) {
      console.error("API call failed:", error);
    }
  }, [entityId, pathname, referer]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callApi();
    }, 7000);

    return () => clearTimeout(timer);
  }, [callApi]);

  return null;
}
