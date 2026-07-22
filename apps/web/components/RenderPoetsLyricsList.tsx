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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets/${slug}/lyrics?preview=original`,
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
    .then((data) => data.data)
    .catch((error) => {
      console.error("Error fetching lyrics:", error);
      return [];
    });

  const groupedLyrics: { letter: string; lyrics: Lyrics[] }[] = [];

  lyrics.forEach((lyric) => {
    const firstLetter = lyric.title[0].toUpperCase();
    const lastGroup = groupedLyrics.at(-1);

    if (lastGroup?.letter === firstLetter) {
      lastGroup.lyrics.push(lyric);
    } else {
      groupedLyrics.push({ letter: firstLetter, lyrics: [lyric] });
    }
  });

  return (
    <main className="flex min-h-[calc(100vh-575px)] flex-col items-center justify-center">
      <ul className="w-full md:grid md:grid-cols-2">
        {groupedLyrics.map((group) => (
          <Fragment key={group.letter}>
            <li className="col-span-2 mt-1 flex pl-1 align-middle">
              <h2 className="ml-4 text-3xl text-gray-800">{group.letter}</h2>
            </li>

            {group.lyrics.map((lyric) => (
              <LyricCard
                key={lyric.slug}
                title={lyric.title}
                genre={lyric.genre}
                slug={lyric.slug}
                preview={lyric.preview}
                preference="original"
                isVerified={lyric.isVerified}
              />
            ))}
          </Fragment>
        ))}
      </ul>
    </main>
  );
}
