"use client";

import { useEffect } from "react";
import Lyrics from "../models/Lyrics";

export default function ViewCount({
  lyric,
  referer,
}: {
  lyric: Lyrics;
  referer: string;
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      callApi();
    }, 10000);

    // Cleanup the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  async function callApi() {
    try {
      await fetch("https://api.midhah.com/v2/view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entityId: lyric?.id,
          entityType: "LYRICS",
          referrer: referer,
        }),
      });
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  return null;
}
