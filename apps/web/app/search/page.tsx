"use client";

import Loader from "@/components/Loader";
import LyricCard from "@/components/LyricCard";
import { FilteredLyrics } from "@/models/Lyrics";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { useLyricsStore } from "../../store/useLyricsStore";

function SearchInner() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const [lyrics, setLyrics] = useState<FilteredLyrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addRecentSearch } = useLyricsStore();

  const addSearchLyric = useCallback(
    (query: string) => {
      const newItem = { icon: "search", title: query };

      addRecentSearch(newItem);
    },
    [addRecentSearch],
  );
  useEffect(() => {
    if (!query) return;
    addSearchLyric(query);

    setLyrics([]);
  }, [addSearchLyric, query, setLyrics]);

  useEffect(() => {
    if (!query) return;

    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search?query=${encodeURIComponent(
        query,
      )}&size=30`,
    )
      .then((response) => {
        if (!response.ok) {
          setIsLoading(false);
          return { data: [] };
        }
        return response.json();
      })
      .then((res) => {
        if (res.data?.length) {
          setLyrics([...res.data]);
        }
        setIsLoading(false);
      });
  }, [query]);

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <main className="flex min-h-[calc(100vh-575px)] flex-col items-center justify-center">
        <ul className="w-full md:grid md:grid-cols-2">
          {lyrics.map((lyric: FilteredLyrics) => (
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

        {isLoading && <Loader />}
      </main>
    </div>
  );
}

export default function Search() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchInner />
    </Suspense>
  );
}
