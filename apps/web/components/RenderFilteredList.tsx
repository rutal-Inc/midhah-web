import { FilteredLyrics } from "../models/Lyrics";
import LyricCard from "./LyricCard";

/* Static map — template-literal classes (`md:grid-cols-${columns}`) are
   invisible to Tailwind's scanner and silently generate nothing. */
const GRID_COLUMNS: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export default async function RenderFilteredList({
  size,
  type,
  columns = 2,
}: Readonly<{ size: number; type: string; columns?: number }>) {
  const lyrics: FilteredLyrics[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${type}?size=${size}&preview=original`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.data);

  return (
    <ul
      className={`w-full md:grid ${GRID_COLUMNS[columns] ?? "md:grid-cols-2"}`}
    >
      {lyrics.map((lyric: FilteredLyrics) => (
        <LyricCard
          key={lyric.slug}
          title={lyric.title}
          genre={lyric.genre}
          slug={lyric.slug}
          preview={lyric.preview}
          poet={lyric.poet}
          preference="original"
          isVerified={lyric.isVerified}
        />
      ))}
    </ul>
  );
}
