"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function getCookie(name: string): string | null {
  const match = new RegExp(new RegExp(`(^| )${name}=([^;]+)`)).exec(
    document.cookie,
  );
  return match ? decodeURIComponent(match[2]) : null;
}

export default function ViewCount({
  entityId,
  entityType,
}: {
  entityId: number;
  entityType: "LYRICS" | "POET";
}) {
  const pathname = usePathname();
  const [referer, setReferer] = useState<string | null>(null);

  useEffect(() => {
    setReferer(getCookie("referer"));
  }, [pathname]);

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
          entityType,
          referrer: referer?.includes(pathname) ? undefined : referer,
          client: "WEB",
        }),
      });
    } catch (error) {
      console.error("API call failed:", error);
    }
  }, [entityId, entityType, pathname, referer]);

  useEffect(() => {
    const timer = setTimeout(() => {
      callApi();
    }, 7000);

    return () => clearTimeout(timer);
  }, [callApi]);

  return null;
}
