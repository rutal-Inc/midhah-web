import { getLyrics } from "@/app/[genre]/[slug]/_lib/lyricsService";
import { getPageGenre } from "@/utilities/helpers";
import OgImage from "../_components/OgImage";
import { Params } from "../_lib/types";

export { OG_IMAGE_SIZE as size } from "../_components/OgImage";

export const runtime = "edge";
export const contentType = "image/png";

export default async function Image({ params }: Readonly<{ params: Params }>) {
  const { slug, genre } = await params;
  const genreDetails = getPageGenre(genre);
  const lyrics = await getLyrics(slug);

  return OgImage({
    title: lyrics?.title ?? "",
    genreLabel: genre,
    color: genreDetails?.color,
  });
}
