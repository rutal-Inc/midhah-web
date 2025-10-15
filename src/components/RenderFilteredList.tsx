import { FilteredLyrics } from "../models/Lyrics";
import LyricCard from "./LyricCard";

export default async function RenderFilteredList({
  size,
  type,
  columns = 2,
}: Readonly<{ size: number; type: string; columns?: number }>) {
  const lyrics: FilteredLyrics[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${type}?size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 86400, // 24 * 60 * 60
      },
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.data);

  return (
    <ul className={`w-full md:grid md:grid-cols-${columns}`}>
      {lyrics.map((lyric: FilteredLyrics) => (
        <LyricCard
          key={lyric.slug}
          title={lyric.title}
          genre={lyric.genre}
          slug={lyric.slug}
          preview={lyric.preview}
          poet={lyric.poet}
        />
      ))}
    </ul>
  );
}
