import Lyrics from "@/models/Lyrics";

// Only pre-generate top trending lyrics at build time to optimize build speed
const TRENDING_STATIC_PARAMS_LIMIT = 50;

export async function getLyricsStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/static-params?client=web&trending=true&size=${TRENDING_STATIC_PARAMS_LIMIT}`,
    );

    if (!res.ok) {
      console.warn(
        `Failed to fetch static params: ${res.status} ${res.statusText}. Falling back to on-demand generation.`,
      );
      return [];
    }
    const lyrics = await res.json();

    return (lyrics.data ?? []).map((lyric: Pick<Lyrics, "genre" | "slug">) => ({
      genre: String(lyric.genre),
      slug: String(lyric.slug),
    }));
  } catch (error) {
    console.warn(
      "Error fetching static params, falling back to on-demand generation:",
      error,
    );
    return [];
  }
}
