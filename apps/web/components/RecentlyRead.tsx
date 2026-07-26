"use client";

import { History } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "recently-read";
const MAX_ITEMS = 6;

export type RecentlyReadItem = {
  title: string;
  genre: string;
  slug: string;
};

function readList(): RecentlyReadItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RecentlyReadItem[]) : [];
  } catch {
    return [];
  }
}

/** Drop-in for lyric pages: records the visit to localStorage, renders nothing. */
export function RecordRead({ title, genre, slug }: Readonly<RecentlyReadItem>) {
  useEffect(() => {
    try {
      const list = readList().filter((item) => item.slug !== slug);
      list.unshift({ title, genre, slug });
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(list.slice(0, MAX_ITEMS)),
      );
    } catch {
      // localStorage unavailable (private mode) — shelf simply stays empty.
    }
  }, [title, genre, slug]);

  return null;
}

/** Home shelf: swipeable "continue reading" rail. Renders nothing when empty. */
export function RecentlyReadShelf() {
  const [items, setItems] = useState<RecentlyReadItem[]>([]);

  useEffect(() => {
    setItems(readList());
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="container mx-auto py-6 md:px-17.5">
      <div className="mb-2 flex items-center gap-2 px-4 md:px-0">
        <History className="text-accent h-5 w-5" aria-hidden />
        <h2 className="text-xl md:text-2xl">Continue reading</h2>
      </div>
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:px-0 [&::-webkit-scrollbar]:hidden">
        {items.map((item) => (
          <li
            key={item.slug}
            className="w-56 shrink-0 snap-start rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <Link
              href={`/${item.genre}/${item.slug}`}
              className="block px-4 py-3"
            >
              <h3 className="truncate font-medium text-gray-900">
                {item.title}
              </h3>
              <p className="mt-1 truncate text-sm text-gray-500 uppercase">
                {item.genre}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
