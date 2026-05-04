import Lyrics from "@/src/models/Lyrics";
import { cache } from "react";

export const getLyrics = cache(async (slug: string): Promise<Lyrics | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${slug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: { tags: [`lyrics-${slug}`] },
      },
    );

    if (!res.ok) return null;

    const json = await res.json();

    return json.data ?? null;
  } catch (error) {
    console.error("Lyrics Fetch error:", error);
    return null;
  }
});
