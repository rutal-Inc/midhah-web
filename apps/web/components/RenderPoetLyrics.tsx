import { LyricPreference } from "@/store/useLyricsPreference";
import Link from "next/link";
import { FilteredLyrics } from "../models/Lyrics";
import LyricCard from "./LyricCard";

export default async function RenderPoetLyrics({
  size = 5,
  poetname,
  poetslug,
  exclude,
  preference,
}: Readonly<{
  size: number;
  poetname: string;
  poetslug: string;
  exclude?: string;
  preference: LyricPreference;
}>) {
  const lyrics: FilteredLyrics[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/poets/${poetslug}?size=${size}&exclude=${exclude}&preview=${preference}`,
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

  if (lyrics.length === 0) return null;

  return (
    <div>
      <div className="mx-auto w-full py-4">
        <div className="my-3 mt-5 w-full">
          <h2 className="mb-1 text-center text-2xl text-gray-600 md:text-3xl lg:text-4xl">
            <span className="text-lg md:text-xl lg:text-2xl">
              Trending from
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
              preference={preference}
              isVerified={lyric.isVerified}
            />
          ))}
        </ul>
        <div className="my-3 flex w-full items-center justify-center">
          <Link
            href={`/poets/${poetslug}`}
            prefetch={false}
            className="btn-secondary mt-6 flex max-w-50 cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-base font-medium text-white sm:px-4 sm:py-2"
          >
            <h2 className="text-xl text-gray-100">Browse All Lyrics</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
