"use client";

import { useLyricsStore } from "@/store/useLyricsStore";
import { Search as SearchIcon, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CHIP_COUNT = 4;

/**
 * The home hero's centerpiece: a large search field with trending kalam
 * chips beneath it. Navigation-only — full typeahead lives in the navbar
 * search; this optimizes the "arrived hunting a specific kalam" path.
 */
export default function HeroSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const { trendingLyrics, setTrendingLyrics } = useLyricsStore();

  useEffect(() => {
    if (trendingLyrics.length === 0) setTrendingLyrics();
  }, [trendingLyrics.length, setTrendingLyrics]);

  const submit = () => {
    const query = value.trim().toLowerCase();
    if (!query) {
      inputRef.current?.focus();
      return;
    }
    router.push(`/search?query=${query.replaceAll(/\s/g, "+")}`);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4">
      <form
        role="search"
        className="flex items-center gap-1 rounded-full bg-white p-1.5 pl-5 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <SearchIcon className="h-5 w-5 shrink-0 text-gray-400" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search hamd, naat, kalam…"
          aria-label="Search lyrics"
          className="min-w-0 flex-1 border-none bg-transparent px-2 py-2 text-base text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 focus:outline-none"
        />
        <button
          type="submit"
          className="btn-secondary rounded-full px-5 py-2.5 text-sm"
        >
          Search
        </button>
      </form>

      {trendingLyrics.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-white/70" aria-hidden />
          {trendingLyrics.slice(0, CHIP_COUNT).map((lyric) => (
            <Link
              key={lyric.title}
              href={`/search?query=${encodeURIComponent(lyric.title.toLowerCase())}`}
              className="max-w-[45vw] truncate rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm hover:bg-white/20 sm:max-w-60"
            >
              {lyric.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
