export default interface Lyrics {
  id: number;
  title: string;
  genre: string;
  preview: string;
  lyrics?: string;
  slug: string;
}
export interface SuggestionLyrics {
  title: string;
  icon:string;
}
