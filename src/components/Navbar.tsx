"use client";

import Loader from "@/src/components/Loader";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SuggestionLyrics } from "../models/Lyrics";

function Navbar() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [listDisplay, setListDisplay] = useState<boolean>(false);
  const [suggestionList, setSuggestionList] = useState<SuggestionLyrics[]>([]);
  const [combinedLocalList, setCombinedLocalList] = useState<
    SuggestionLyrics[]
  >([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const getCombinedList = () => {
    const searchRaw = localStorage.getItem("recent-searches");
    const trendRaw = localStorage.getItem("trending-lyrics");

    let searchLyrics = searchRaw ? JSON.parse(searchRaw) : [];
    let trendLyrics = trendRaw ? JSON.parse(trendRaw) : [];

    searchLyrics = searchLyrics.slice(0, 3);
    trendLyrics = trendLyrics.slice(0, 5);

    return [...searchLyrics, ...trendLyrics];
  };

  useEffect(() => {
    setCombinedLocalList(getCombinedList());
    setActiveIndex(-1);
  }, [searchInput]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchInput.length > 0) {
      const maxIndex = suggestionList.length - 1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
      }

      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const selected = suggestionList[activeIndex];
        router.push(
          `/search?query=${selected.title.toLowerCase().replace(/\s/g, "+")}`,
        );
        setSearchInput(selected.title.toLowerCase());
        setListDisplay(false);
      }
    } else {
      const maxIndex = combinedLocalList.length - 1;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
      }

      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const selected = combinedLocalList[activeIndex];
        router.push(
          `/search?query=${selected.title.toLowerCase().replace(/\s/g, "+")}`,
        );
        setSearchInput(selected.title.toLowerCase());
        setListDisplay(false);
        setTimeout(() => {
          inputRef.current?.blur();
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (searchInput.length < 3) {
      setSuggestionList([]);
      return;
    }

    const handler = setTimeout(() => {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/suggestions?query=${searchInput}`,
      )
        .then((res) => res.json())
        .then((res) => {
          setSuggestionList(res.data);
          setIsLoading(false);
        });
    }, 400);

    return () => clearTimeout(handler);
  }, [searchInput]);

  return (
    <nav className="relative mx-auto mb-4 w-[90%] flex-col px-3 md:w-[92%] md:px-5 lg:w-[88%] xl:w-[85%]">
      <div
        className={`flex items-center ${showSearch ? "justify-center" : "justify-between"} gap-2 border-b-2`}
      >
        <Link
          href="/"
          className={`${showSearch ? "max-[520px]:hidden" : "max-[520px]:block"} block`}
        >
          <Image
            src="/images/midhah-lyrics-logo.svg"
            alt="Midhah Lyrics Logo"
            width={150}
            height={70}
          />
        </Link>
        <div
          className={`relative ${showSearch ? "my-2.5 w-[90%] max-[520px]:flex" : "max-[520px]:hidden"} border border-gray-300 focus-within:border-gray-800 w-[34%] items-center gap-[2px] rounded-md px-2 py-0.5 transition-all  min-[520px]:flex min-[520px]:focus-within:w-[62%] md:pr-7 md:focus-within:w-[60%] lg:w-[32%] lg:px-2.5 lg:focus-within:w-[40%] xl:focus-within:w-[45%]`}
        >
          <input
            ref={inputRef}
            aria-label="Search your favorite midhah lyrics"
            onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
            value={searchInput}
            placeholder="Search fav madh lyrics..."
            className="w-full border-none bg-inherit focus:border-none focus:ring-0 focus:outline-none"
            onFocus={() => {
              setTimeout(() => setCombinedLocalList(getCombinedList()), 150);
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
            className="bi bi-search cursor-pointer hover:bg-gray-100 px-1.5 py-1 rounded-sm"
            onMouseDown={(e) => {
              e.preventDefault();

              inputRef.current?.blur();
              if (searchInput.length <= 0) return;
              router.push(
                `/search?query=${searchInput
                  .toLowerCase()
                  .replace(/\s/g, "+")}`,
                )
            }}
          ></button>
          <ul
            className={` ${listDisplay ? "absolute" : "hidden"} top-11.5 left-[1px] z-9999 w-full rounded-md bg-white`}
          >
            {searchInput.length > 0
              ? suggestionList.map((suggestion, idx) => (
                  <li
                    key={suggestion.title}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <button
                      className={`mt-0.5 flex h-10 w-full cursor-pointer items-center justify-start gap-3 rounded-md px-2.5 py-0.5 text-left text-lg hover:bg-slate-100 ${
                        idx === activeIndex ? "bg-slate-100" : ""
                      }`}
                      onMouseDown={() => {
                        setSearchInput(suggestion.title.toLowerCase());
                        router.push(
                          `/search?query=${suggestion.title
                            .toLowerCase()
                            .replace(/\s/g, "+")}`,
                        );
                        setListDisplay(false);
                        setShowSearch(false);
                      }}
                    >
                      <i className="bi bi-search"></i>
                      <span className="truncate">
                        {suggestion.title.toLowerCase()}
                      </span>
                    </button>
                  </li>
                ))
              : combinedLocalList.map((suggestion, idx) => (
                  <li
                    key={suggestion.title}
                    onMouseEnter={() => setActiveIndex(idx)}
                  >
                    <button
                      className={`mt-0.5 flex h-10 w-full cursor-pointer justify-start gap-3 ${
                        idx === activeIndex ? "bg-slate-100" : ""
                      } items-center rounded-md px-2.5 py-0.5 text-left text-lg hover:bg-slate-100`}
                      onMouseDown={() => {
                        setSearchInput(suggestion.title.toLowerCase());
                        router.push(
                          `/search?query=${suggestion.title
                            .toLowerCase()
                            .replace(/\s/g, "+")}`,
                        );
                        setListDisplay(false);
                        setShowSearch(false);
                      }}
                    >
                      {suggestion.icon === "trend" ? (
                        <TrendingUp />
                      ) : (
                        <i className="bi bi-clock-history"></i>
                      )}
                      <span className="truncate">
                        {suggestion.title.toLowerCase()}
                      </span>
                    </button>
                  </li>
                ))}
            {isLoading && <Loader />}
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

        <div className="hidden gap-8 lg:flex">
          <Link href="/">Home</Link>
          <Popover className="relative">
            <PopoverButton className="focus-within:outline-0">
              Genres <i className="bi bi-chevron-down text-xs"></i>
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="flex flex-col rounded-sm bg-white py-4 shadow-lg [--anchor-gap:4px]"
            >
              <Link
                href="/hamd"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Hamd e Ta&apos;ala
              </Link>
              <Link
                href="/naat"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Naat e Rasool
              </Link>
              <Link
                href="/manqbat"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Manqbat
              </Link>
              <Link
                href="/durood-o-salam"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Durood o Salam
              </Link>
            </PopoverPanel>
          </Popover>
          <Link href="/trending">Trending</Link>
          <Link href="/staff-picks">Staff Picks</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
