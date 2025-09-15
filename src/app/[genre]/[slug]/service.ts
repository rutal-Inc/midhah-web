// lib/getLyrics.ts
import Lyrics from "@/src/models/Lyrics";

export async function getLyrics(slug: string): Promise<Lyrics | null> {
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
  ).then((response) => response.json());

  return res.data ? (res.data as Lyrics) : null;
}
