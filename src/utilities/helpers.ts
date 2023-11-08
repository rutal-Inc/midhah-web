import { genresInfo } from "./constants";

export function capitalize(phrase: string, splitter: string = " "): string {
  const words = phrase.split(splitter);
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  return capitalizedWords.join(splitter);
}

export function getPageGenre(genre: string) {
  return genresInfo.filter((genreInfo) => genreInfo.path === genre)[0];
}
