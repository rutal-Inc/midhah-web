export default interface Lyrics {
  id: number;
  title: string;
  genre: string;
  preview: string;
  lyrics?: string;
  slug: string;
  poet: {
    name: string;
    slug?: string;
  };
}
export interface FilteredLyrics {
  id: number;
  title: string;
  genre: string;
  preview: string;
  lyrics?: string;
  slug: string;
  poet?: string;
}
export interface SuggestionLyrics {
  title: string;
  icon: string;
}
