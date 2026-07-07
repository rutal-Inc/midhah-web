import Lyrics from "@/models/Lyrics";

export async function getLyricsStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics?page=0&size=5000&sortBy=id&orderBy=asc`,
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lyrics: ${res.status} ${res.statusText}`,
      );
    }
    const lyrics = await res.json();

    return lyrics.data.map((lyric: Lyrics) => ({
      genre: String(lyric.genre),
      slug: String(lyric.slug),
    }));
  } catch (error) {
    console.error("Critical error in generateStaticParams:", error);
    throw error;
  }
}
