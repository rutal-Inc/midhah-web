"use client";

import { useEffect, useRef, useState } from "react";
import Lyrics from "../models/Lyrics";
import Loader from "./Loader";
import LyricCard from "./LyricCard";

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
          } else {
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
          <LyricCard
            title={lyric.title}
            genre={genre}
            slug={lyric.slug}
            preview={lyric.preview}
            key={lyric.slug + index}
            ref={index === lyrics.length - 1 ? lastLyricRef : undefined}
            poet={lyric.poet?.name}
          />
        ))}
      </ul>

      {isLoading && <Loader />}
    </main>
  );
}
