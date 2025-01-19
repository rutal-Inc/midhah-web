import Link from "next/link";
import { noto_nastaliq_urdu } from "../app/fonts";
import Lyrics from "../models/Lyrics";

export default async function RenderFilteredList({
  size,
  type,
  columns = 2,
}: Readonly<{ size: number; type: string; columns?: number }>) {
  const lyrics: Lyrics[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${type}?size=${size}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: [new Date().toISOString().split("T")[0]],
      },
    },
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => data.data);

  return (
    <ul className={`w-full md:grid md:grid-cols-${columns}`}>
      {lyrics.map((lyric: Lyrics, index: number) => (
        <Link href={`/naat/${lyric.slug}`} key={lyric.slug}>
          <li className="group relative my-1 flex flex-row hover:block">
            <div className="flex flex-1 scale-100 cursor-pointer select-none items-center p-4 hover:bg-gray-50 group-hover:scale-0">
              <div className="mr-16 flex-1 pl-1">
                <h2 className="text-gray-600">{lyric.title}</h2>
                <h3 className="text-sm uppercase text-gray-400">
                  {lyric.genre}
                </h3>
              </div>
            </div>
            <div
              className={`${noto_nastaliq_urdu.className} absolute top-1/2 -translate-y-1/2 scale-0 whitespace-pre-wrap text-center text-3xl group-hover:z-10 group-hover:w-full group-hover:scale-100 group-hover:bg-slate-50 group-hover:py-4 group-hover:transition-all`}
            >
              {lyric.preview}
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
