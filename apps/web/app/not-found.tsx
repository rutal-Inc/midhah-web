import { genresInfo } from "@/utilities/constants";
import { Frown, Search } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto my-24 max-w-md px-4 text-center">
      <Frown className="text-accent mx-auto my-5 h-16 w-16" aria-hidden />
      <h2 className="text-2xl font-semibold">This page doesn&apos;t exist</h2>
      <p className="mt-2 mb-6 text-gray-500">
        The kalam you&apos;re looking for may have moved. Try a search, or
        browse a genre below.
      </p>

      <Link
        href="/search"
        className="btn-secondary inline-flex items-center gap-2 rounded-sm px-4 py-2"
      >
        <Search className="h-4 w-4" />
        Search lyrics
      </Link>

      <ul className="mt-8 flex flex-wrap justify-center gap-2">
        {genresInfo.map((genre) => (
          <li key={genre.path}>
            <Link
              href={`/${genre.path}`}
              className="text-accent inline-block rounded-full border border-gray-200 px-3 py-1 text-sm capitalize hover:bg-gray-50"
            >
              {genre.title.toLowerCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
