import { Fragment } from "react";
import Lyrics from "../models/Lyrics";
import LyricCard from "./LyricCard";

type Params = {
  slug: string;
};
export default async function RenderPoetsLyricsList({
  slug,
}: Readonly<Params>) {
  const lyrics: Lyrics[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets/${slug}/lyrics`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.data);

  let lastLetter = "";

  return (
    <main className="flex min-h-[calc(100vh-575px)] flex-col items-center justify-center">
      <ul className="w-full md:grid md:grid-cols-2">
        {lyrics.map((lyric: Lyrics, index: number) => {
          const firstLetter = lyric.title[0].toUpperCase();
          const showLetter = firstLetter !== lastLetter;
          lastLetter = firstLetter;

          return (
            <Fragment key={lyric.slug + index}>
              {showLetter && (
                <li className="col-span-2 mt-1 flex pl-1 align-middle">
                  <h2 className="ml-4 text-3xl text-gray-800">{firstLetter}</h2>
                </li>
              )}
              <LyricCard
                title={lyric.title}
                genre={lyric.genre}
                slug={lyric.slug}
                preview={lyric.preview}
              />
            </Fragment>
          );
        })}
      </ul>
    </main>
  );
}
