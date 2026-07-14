import Lyrics from "@/models/Lyrics";

export async function getLyricsStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/static-params`,
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lyrics: ${res.status} ${res.statusText}`,
      );
    }
    const lyrics = await res.json();

    return lyrics.data.map((lyric: Pick<Lyrics, "genre" | "slug">) => ({
      genre: String(lyric.genre),
      slug: String(lyric.slug),
    }));
  } catch (error) {
    console.error("Critical error in generateStaticParams:", error);
    throw error;
  }
}
