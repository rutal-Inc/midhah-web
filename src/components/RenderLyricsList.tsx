"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { noto_nastaliq_urdu } from "../app/fonts";
import Lyrics from "../models/Lyrics";
import Loader from "./Loader";

type Params = {
  genre: string;
};
export default function RenderLyricsList({ genre }: Readonly<Params>) {
  const [lyrics, setLyrics] = useState<Lyrics[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  const lastLyricRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const lastLyricNode = lastLyricRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (lastLyricNode) {
      observer.observe(lastLyricNode);
    }

    return () => {
      if (lastLyricNode) {
        observer.unobserve(lastLyricNode);
      }
    };
  }, [isLoading, page, lastLyricRef]);

  useEffect(() => {
    
    if (genre && hasMoreData) {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/genre/${genre}?page=${page}&size=30`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((response) => {
          if (!response.ok) {
            setHasMoreData(false);
            setIsLoading(false);
          }
          return response.json();
        })
        .then((res) => {
          if (res.data) {
            setLyrics((prevLyrics) => [...prevLyrics, ...res.data]);
          }else{
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    }
  }, [genre, hasMoreData, page]);

  return (
    <main className="flex min-h-[calc(100vh-575px)] flex-col items-center justify-center">
      <ul className="w-full md:grid md:grid-cols-2">
        {lyrics.map((lyric: Lyrics, index: number) => (
          <Link href={`/${genre}/${lyric.slug}`} key={lyric.slug + index}>
            <li
              className="group relative my-1 flex flex-row hover:block"
              ref={index === lyrics.length - 1 ? lastLyricRef : undefined}
            >
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

      {isLoading && <Loader />}
    </main>
  );
}
