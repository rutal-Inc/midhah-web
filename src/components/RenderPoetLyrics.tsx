import Link from "next/link";
import { FilteredLyrics } from "../models/Lyrics";
import LyricCard from "./LyricCard";

export default async function RenderPoetLyrics({
  size = 5,
  poetname,
  poetslug,
}: Readonly<{
  size: number;
  poetname: string;
  poetslug: string;
}>) {
  const lyrics: FilteredLyrics[] = await fetch(
    // `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets/${poetslug}/lyrics`,
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/poets/${poetslug}?size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 86400,
      },
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.data);

  return (
    <div>
      <div className="mx-auto w-full py-4">
        <div className="my-3 mt-5 w-full">
          <h2 className="mb-1 text-center text-2xl text-gray-600 md:text-3xl lg:text-4xl">
            <span className="text-lg md:text-xl lg:text-2xl">
              Popular Picks by
            </span>{" "}
            <strong>{poetname}</strong>
          </h2>
        </div>
        <ul className={`w-full md:grid md:grid-cols-2`}>
          {lyrics.slice(0, 6).map((lyric: FilteredLyrics) => (
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
        <div className="my-3 flex w-full items-center justify-center">
          <Link
            href={`/poets/${poetslug}`}
            className="btn-secondary mt-6 flex max-w-[200px] cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-base font-medium text-white sm:px-4 sm:py-2"
          >
            <h2 className="text-xl text-gray-100">Browse All Lyrics</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
