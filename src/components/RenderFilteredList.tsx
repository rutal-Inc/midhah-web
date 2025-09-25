"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { noto_nastaliq_urdu } from "../app/fonts";
import Lyrics from "../models/Lyrics";

export default function RenderFilteredList({
  size,
  type,
  columns = 2,
}: Readonly<{ size: number; type: string; columns?: number }>) {
  const [lyrics, setLyrics] = useState<Lyrics[]>([]);

  useEffect(() => {
    async function fetchLyrics() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${type}?size=${size}`,
      );
      const data = await res.json();
      setLyrics(data.data);

      if (type === "trending") {
        const formatted = data.data.map(({ title }: { title: string }) => ({
          icon: "trend",
          title: title,
        }));
        const top5 = formatted.slice(0, 5);
        localStorage.setItem("trending-lyrics", JSON.stringify(top5));
      }
    }

    fetchLyrics();
  }, [size, type]);

  return (
    <ul className={`w-full md:grid md:grid-cols-${columns}`}>
      {lyrics.map((lyric: Lyrics, index: number) => (
        <Link href={`/${lyric.genre}/${lyric.slug}`} key={lyric.slug}>
          <li className="group relative my-1 flex flex-row hover:block">
            <div className="flex flex-1 scale-100 cursor-pointer items-center p-4 select-none group-hover:scale-0 hover:bg-gray-50">
              <div className="mr-16 flex-1 pl-1">
                <h2 className="text-gray-600">{lyric.title}</h2>
                <h3 className="text-sm text-gray-400 uppercase">
                  {lyric.genre}
                </h3>
              </div>
            </div>
            <div
              className={`${noto_nastaliq_urdu.className} absolute top-1/2 -translate-y-1/2 scale-0 text-center text-3xl whitespace-pre-wrap group-hover:z-10 group-hover:w-full group-hover:scale-100 group-hover:bg-slate-50 group-hover:py-4 group-hover:transition-all`}
            >
              {lyric.preview}
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
