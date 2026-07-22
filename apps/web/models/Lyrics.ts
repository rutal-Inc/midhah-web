export default interface Lyrics {
  id: number;
  title: string;
  genre: string;
  preview: string;
  content?: string;
  slug: string;
  isVerified: boolean;
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
  content?: string;
  slug: string;
  poet?: string;
  isVerified: boolean;
}
export interface SuggestionLyrics {
  title: string;
  icon: string;
}

export interface TransliteratedLyrics {
  id: number;
  title: string;
  genre: string;
  preview: string;
  transliteratedContent?: string;
  isVerified: boolean;
  slug: string;
  poet: {
    name: string;
    slug?: string;
  };
}
