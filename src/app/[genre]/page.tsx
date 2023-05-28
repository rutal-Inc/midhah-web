"use client";

import Loader from "@/src/components/Loader";
import GenreInfo from "@/src/models/GenreInfo";
import Lyrics from "@/src/models/Lyrics";
import { genresInfo } from "@/src/utilities/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Params = {
  params: { genre: string };
};
export default function GenreListPage({ params }: Params) {
  const genre = params.genre;

  const [lyrics, setLyrics] = useState<Lyrics[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [genreInfo, setGenreInfo] = useState<GenreInfo | null>(null);

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
    setIsLoading(true);

    if (genre && hasMoreData) {
      setGenreInfo(getPageGenre(genre));

      fetch(`https://api.midhah.com/v2/lyrics/${genre}?page=${page}&size=30`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            setHasMoreData(false);
          }
          return response.json();
        })
        .then((res) => {
          if (res.data) {
            setLyrics((prevLyrics) => [...prevLyrics, ...res.data]);
          }
          setIsLoading(false);
        });
    }
  }, [genre, hasMoreData, page]);

  function getPageGenre(genre: string) {
    return genresInfo.filter((genreInfo) => genreInfo.path === genre)[0];
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div
        className="relative overflow-hidden card mb-5 md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-[60px] md:py-[150px] text-center">
          <h1 className="text-2xl md:text-5xl mb-1 text-white">
            {genreInfo?.title}
          </h1>
        </div>
      </div>

      <main className="flex items-center justify-center flex-col min-h-[calc(100vh-575px)]">
        <ul className="md:grid md:grid-cols-2 w-full">
          {lyrics.map((lyric: Lyrics, index: number) => (
            <Link href={`/${genre}/${lyric.slug}`} key={lyric.slug}>
              <li
                className="flex flex-row my-1"
                ref={index === lyrics.length - 1 ? lastLyricRef : undefined}
              >
                <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                  <div className="flex-1 pl-1 mr-16">
                    <div className="text-gray-600  ">{lyric.title}</div>
                    <span className="text-gray-400  text-sm uppercase">
                      {lyric.genre}
                    </span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>

        {isLoading && <Loader />}
      </main>
    </div>
  );
}
