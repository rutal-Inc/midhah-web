import Lyrics from "@/models/Lyrics";

// Pre-generate trending lyrics at build time (configurable via env, defaults to 50 items and 30 days)
const TRENDING_STATIC_PARAMS_LIMIT =
  Number(process.env.TRENDING_STATIC_PARAMS_LIMIT) || 50;
const TRENDING_STATIC_PARAMS_DAYS =
  Number(process.env.TRENDING_STATIC_PARAMS_DAYS) || 30;

export async function getLyricsStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/static-params?client=web&trending=true&size=${TRENDING_STATIC_PARAMS_LIMIT}&days=${TRENDING_STATIC_PARAMS_DAYS}`,
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch static params: ${res.status} ${res.statusText}. Falling back to on-demand generation.`,
      );
      return [];
    }
    const lyrics = await res.json();

    const params = (lyrics.data ?? []).map(
      (lyric: Pick<Lyrics, "genre" | "slug">) => ({
        genre: String(lyric.genre),
        slug: String(lyric.slug),
      }),
    );

    console.log(`Pre-generating ${params.length} trending lyrics pages.`);

    return params;
  } catch (error) {
    console.error(
      "Error fetching static params, falling back to on-demand generation:",
      error,
    );
    return [];
  }
}
