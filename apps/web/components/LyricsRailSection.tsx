import { FilteredLyrics } from "@/models/Lyrics";
import Link from "next/link";
import LyricCard from "./LyricCard";

type LyricsRailSectionProps = {
  title: string;
  type: "trending" | "staff-picks";
  size: number;
  href: string;
};

/**
 * One home section of lyrics fetched once and rendered twice:
 * a swipeable horizontal rail on mobile, a vertical list on md+.
 */
export default async function LyricsRailSection({
  title,
  type,
  size,
  href,
}: Readonly<LyricsRailSectionProps>) {
  const lyrics: FilteredLyrics[] = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${type}?size=${size}&preview=original`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    },
  )
    .then((response) => response.json())
    .then((data) => data.data)
    .catch(() => []);

  if (!lyrics.length) return null;

  return (
    <section className="container mx-auto py-8 md:pt-14">
      <div className="mb-2 flex items-baseline justify-between px-4 md:mb-4">
        <h2 className="text-2xl md:text-4xl">{title}</h2>
        <Link
          href={href}
          className="text-accent text-sm font-medium hover:underline md:hidden"
        >
          See all
        </Link>
      </div>

      {/* Mobile: swipeable rail */}
      <ul className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:hidden [&::-webkit-scrollbar]:hidden">
        {lyrics.map((lyric) => (
          <li
            key={lyric.slug}
            className="w-64 shrink-0 snap-start rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <Link
              href={`/${lyric.genre}/${lyric.slug}`}
              className="block px-4 py-3"
            >
              <h3 className="truncate font-medium text-gray-900">
                {lyric.title}
              </h3>
              <p className="mt-1 truncate text-sm text-gray-500 uppercase">
                {lyric.poet ? `${lyric.genre} · ${lyric.poet}` : lyric.genre}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop: vertical list (existing card) */}
      <ul className="hidden w-full md:block">
        {lyrics.map((lyric) => (
          <LyricCard
            key={lyric.slug}
            title={lyric.title}
            genre={lyric.genre}
            slug={lyric.slug}
            preview={lyric.preview}
            poet={lyric.poet}
            preference="original"
            isVerified={lyric.isVerified}
          />
        ))}
      </ul>

      <div className="mx-auto mt-4 hidden text-center md:block">
        <Link
          href={href}
          className="ring-secondary-light hover:ring-secondary inline-block rounded-sm border px-4 py-2 ring-1 ring-inset hover:ring-2 hover:ring-inset"
        >
          Explore More
        </Link>
      </div>
    </section>
  );
}
