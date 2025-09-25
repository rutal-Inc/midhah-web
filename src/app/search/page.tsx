"use client";

import Loader from "@/src/components/Loader";
import Lyrics from "@/src/models/Lyrics";
import { genresInfo } from "@/src/utilities/constants";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { noto_nastaliq_urdu } from "../fonts";

export default function Search() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const [lyrics, setLyrics] = useState<Lyrics[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);

  const lastLyricRef = useRef<HTMLLIElement>(null);

  function getGenreIcon(genre: string): StaticImageData {
    const index = genresInfo.findIndex((genreInfo) => {
      if (genreInfo.path == genre) {
        return genreInfo.image;
      }
    });

    return genresInfo[index].image;
  }

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


  const addSearchLyric = (query: string) => {
    const raw = localStorage.getItem("recent-searches");
    const arr = raw ? JSON.parse(raw) : [];

    const filtered = arr.filter((item: any) => item.title !== query);

    const newItem = { icon: "search", title: query };

    const newArr = [newItem, ...filtered];
    localStorage.setItem("searchLyrics", JSON.stringify(newArr));
  };

  useEffect(() => {
    if (!query) return;
    addSearchLyric(query); 

    setLyrics([]);
    setPage(0);
    setHasMoreData(true);
  }, [query]);

    useEffect(() => {
      if (!query || !hasMoreData) return;

      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?query=${encodeURIComponent(
          query
        )}&page=${page}&size=30`
      )
        .then((response) => {
          if (!response.ok) {
            setHasMoreData(false);
            setIsLoading(false);
            return { data: [] };
          }
          return response.json();
        })
        .then((res) => {
          if (res.data?.length) {
            setLyrics((prev) => [...prev, ...res.data]);
          } else {
            // no more data
            setHasMoreData(false);
          }
          setIsLoading(false);
        });
    }, [query]);

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <main className="flex min-h-[calc(100vh-575px)] flex-col items-center justify-center">
        <ul className="w-full md:grid md:grid-cols-2">
          {lyrics.map((lyric: Lyrics, index: number) => (
            <Link href={`/${lyric.genre}/${lyric.slug}`} key={lyric.slug}>
              <li
                className="group relative m-1 flex flex-row bg-slate-100 hover:block"
                ref={index === lyrics.length - 1 ? lastLyricRef : undefined}
              >
                <div className="flex flex-1 scale-100 cursor-pointer select-none items-center hover:bg-gray-50 group-hover:scale-0">
                  <div className="flex items-center">
                    <Image
                      src={getGenreIcon(lyric.genre)}
                      height={75}
                      className="invert"
                      alt={lyric.genre}
                    ></Image>
                    <div className="mr-16 flex-1 pl-1">
                      <h2 className="text-gray-600">{lyric.title}</h2>
                      <h3 className="text-sm uppercase text-gray-400">
                        {lyric.genre}
                      </h3>
                    </div>
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
    </div>
  );
}
