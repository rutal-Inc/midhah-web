import { Metadata } from "next";
import SearchResults from "./_components/SearchResults";

type SearchParams = Promise<{ query?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { query } = await searchParams;
  const title = query ? `Search results for “${query}”` : "Search";

  return {
    title,
    description:
      "Search Hamd, Naat, Manqbat, and Durood o Salam lyrics on Midhah — in original Urdu script and Roman transliteration.",
    // Query pages are unbounded near-duplicates; keep them out of the index.
    robots: query ? { index: false, follow: true } : undefined,
  };
}

export default function SearchPage() {
  return <SearchResults />;
}
