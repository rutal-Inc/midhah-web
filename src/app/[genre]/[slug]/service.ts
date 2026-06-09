import Lyrics from "@/src/models/Lyrics";
import { redirect } from "next/navigation";
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

export const getLyricsViaGenreSlug = cache(
  async (slug: string, genre: string): Promise<Lyrics | null> => {
    let res: Response;

    try {
      res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${genre}/${slug}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "force-cache",
          next: { tags: [`lyrics-${slug}`] },
          redirect: "manual",
        },
      );
    } catch (error) {
      console.error("Lyrics Fetch error:", error);
      return null;
    }

    if (res.status === 301) {
      const location = res.headers.get("location");

      if (location) {
        const newSlug = location.split("/").pop();
        const newGenre = location.split("/")[3];
        redirect(`/${newGenre}/${newSlug}`);
      }

      return null;
    } else {
      if (!res.ok) return null;

      try {
        const json = await res.json();
        return json.data ?? null;
      } catch (error) {
        console.error("Lyrics JSON parsing error:", error);
        return null;
      }
    }
  },
);
