"use client";

import Loader from "@/components/Loader";
import { TrendingUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SuggestionLyrics } from "../models/Lyrics";
import { useLyricsStore } from "../store/useLyricsStore";

type Props = {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

function Search({ showSearch, setShowSearch }: Readonly<Props>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [suggestionList, setSuggestionList] = useState<SuggestionLyrics[]>([]);
  const { recentSearches, trendingLyrics, setTrendingLyrics } =
    useLyricsStore();
  const [combinedLocalList, setCombinedLocalList] = useState<
    SuggestionLyrics[]
  >([...recentSearches, ...trendingLyrics]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const query = searchParams.get("query");

  useEffect(() => {
    setTrendingLyrics();
  }, [setTrendingLyrics]);

  useEffect(() => {
    if (query) {
      setSearchInput(query);
    } else {
      setSearchInput("");
    }
  }, [query]);

  useEffect(() => {
    setCombinedLocalList([...recentSearches, ...trendingLyrics]);
  }, [recentSearches, trendingLyrics]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [searchInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const activeList =
      searchInput.length > 0 ? suggestionList : combinedLocalList;
    const maxIndex = activeList.length - 1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const selected = activeList[activeIndex];
      router.push(
        `/search?query=${selected.title.toLowerCase().replaceAll(/\s/g, "+")}`,
      );
      setSearchInput(selected.title.toLowerCase());
      setListDisplay(false);
      if (searchInput.length === 0) {
        setTimeout(() => inputRef.current?.blur(), 0);
      }
    }
  };

  const handleSelect = (title: string) => {
    setSearchInput(title.toLowerCase());
    router.push(`/search?query=${title.toLowerCase().replaceAll(/\s/g, "+")}`);
    setListDisplay(false);
    setShowSearch(false);
  };

  useEffect(() => {
    if (searchInput.length < 2) {
      setSuggestionList([]);
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const handler = setTimeout(() => {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/suggestions?query=${searchInput}`,
        { signal },
      )
        .then((res) => {
          if (!res.ok) throw new Error("Network error");
          return res.json();
        })
        .then((res) => {
          if (!signal.aborted) {
            setSuggestionList(res.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            return;
          }
          setIsLoading(false);
        });
    }, 400);

    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [searchInput]);

  return (
    <>
      <div
        className={`relative ${showSearch ? "my-2 w-full focus-within:w-screen max-[520px]:flex" : "max-[520px]:hidden"} w-full items-center gap-0.5 rounded-md border border-gray-300 px-1 py-0.5 transition-all focus-within:w-[70%] focus-within:rounded-t-md focus-within:border-gray-800 min-[520px]:flex min-[520px]:w-[64%] md:pr-7 md:focus-within:w-[68%] lg:w-[62%] lg:px-2.5 lg:focus-within:w-[64%] xl:w-[50%] xl:focus-within:w-[60%]`}
      >
        <input
          ref={inputRef}
          aria-label="Search your favorite midhah lyrics"
          onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
          value={searchInput}
          placeholder="Search fav madh lyrics..."
          className="w-full border-none bg-inherit focus:border-none focus:ring-0 focus:outline-none"
          onFocus={() => {
            setTimeout(
              () =>
                setCombinedLocalList([...recentSearches, ...trendingLyrics]),
              150,
            );
            setListDisplay(true);
          }}
          onBlur={() => {
            setTimeout(() => setListDisplay(false), 150);
            setShowSearch(false);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          className="bi bi-search cursor-pointer rounded-sm px-1.5 py-1 hover:bg-gray-100"
          onMouseDown={(e) => {
            e.preventDefault();

            inputRef.current?.blur();
            if (searchInput.length <= 0) return;
            router.push(
              `/search?query=${searchInput.toLowerCase().replaceAll(/\s/g, "+")}`,
            );
          }}
        ></button>
        <ul
          className={`${listDisplay ? "absolute" : "hidden"} top-11.5 left-px z-9999 w-full rounded-b-md border border-gray-800 bg-white`}
        >
          {searchInput.length > 0 ? (
            <>
              {isLoading && <Loader />}
              {!isLoading && suggestionList.length === 0 && (
                <li className="flex items-center justify-center px-2.5 py-4">
                  <span className="text-center">
                    {searchInput.length >= 2
                      ? "No results found."
                      : "Keep typing to see results..."}
                  </span>
                </li>
              )}
              {!isLoading &&
                suggestionList.map((suggestion, idx) => (
                  <SuggestionItem
                    key={suggestion.title}
                    suggestion={suggestion}
                    idx={idx}
                    activeIndex={activeIndex}
                    onSelect={() => handleSelect(suggestion.title)}
                    onMouseEnter={() => setActiveIndex(idx)}
                  />
                ))}
            </>
          ) : (
            combinedLocalList?.map((suggestion, idx) => (
              <SuggestionItem
                key={suggestion.title}
                suggestion={suggestion}
                idx={idx}
                activeIndex={activeIndex}
                showIcon
                onSelect={() => handleSelect(suggestion.title)}
                onMouseEnter={() => setActiveIndex(idx)}
              />
            ))
          )}
        </ul>
      </div>
      <button
        className={`${showSearch ? "max-[520px]:hidden" : "max-[520px]:flex"} cursor-pointer items-center rounded-md px-2 py-1 ring-1 hover:bg-gray-100 min-[520px]:hidden`}
        onClick={() => {
          setShowSearch(!showSearch);
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }}
      >
        <i className="bi bi-search"></i>
      </button>
    </>
  );
}

export default Search;

const SuggestionItem = ({
  suggestion,
  idx,
  activeIndex,
  showIcon,
  onSelect,
  onMouseEnter,
}: {
  suggestion: { title: string; icon?: string };
  idx: number;
  activeIndex: number;
  showIcon?: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
}) => (
  <li key={suggestion.title} onMouseEnter={onMouseEnter}>
    <button
      className={`mt-0.5 flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-md px-2.5 py-0.5 text-left text-lg hover:bg-slate-100 ${
        idx === activeIndex ? "bg-slate-100" : ""
      }`}
      onMouseDown={onSelect}
    >
      {showIcon &&
        (suggestion.icon === "trend" ? (
          <TrendingUp />
        ) : (
          <i className="bi bi-clock-history" />
        ))}
      {!showIcon && <i className="bi bi-search" />}
      <span className="truncate">{suggestion.title.toLowerCase()}</span>
    </button>
  </li>
);
