import Lyrics, { TransliteratedLyrics } from "@/models/Lyrics";
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

export const getLyricsViaGenreSlug = cache((slug: string, genre: string) =>
  fetchLyricsResource<Lyrics>(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${genre}/${slug}`,
    `lyrics-${slug}`,
  ),
);

export const getTransliteratedLyricsViaGenreSlug = cache(
  (slug: string, genre: string) =>
    fetchLyricsResource<TransliteratedLyrics>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${genre}/${slug}/transliterated`,
      `lyrics-${slug}`,
    ),
);

async function fetchLyricsResource<T>(
  url: string,
  tag: string,
): Promise<T | null> {
  let res: Response;

  try {
    res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: { tags: [tag] },
      redirect: "manual",
    });
  } catch (error) {
    console.error("Lyrics Fetch error:", error);
    return null;
  }

  if (res.status === 301) {
    const location = res.headers.get("location");

    if (location) {
      const parts = location.split("/");
      const newSlug = parts.pop();
      const newGenre = parts[3];
      redirect(`/${newGenre}/${newSlug}`);
    }

    return null;
  }

  if (!res.ok) return null;

  try {
    const json = await res.json();
    return json.data ?? null;
  } catch (error) {
    console.error("Lyrics JSON parsing error:", error);
    return null;
  }
}
