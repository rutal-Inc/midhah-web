import Loader from "@/components/Loader";
import RenderPoetLyrics from "@/components/RenderPoetLyrics";
import { WEB_BASE_URL } from "@/utilities/constants";
import { capitalize } from "@/utilities/helpers";
import { montserrat } from "@midhah/utils/fonts";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LyricsChunks from "../_components/LyricsChunks";
import LyricsDialogClient from "../_components/LyricsDialogClient";
import { getLyricsStaticParams } from "../_lib/generateStaticParams";
import { getTransliteratedLyricsViaGenreSlug } from "../_lib/service";
import { Params } from "../_lib/types";

export async function generateStaticParams() {
  return getLyricsStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, genre } = await params;
  const lyric = await getTransliteratedLyricsViaGenreSlug(slug, genre);

  if (!lyric) {
    notFound();
  }

  const title = `${lyric.title.trim()} in Roman Urdu (${capitalize(
    lyric.genre,
    "-",
  )}) | Midhah Lyrics`;

  const description = `Read the lyrics of ${lyric.genre} ${lyric.title}. Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Midhah Lyrics",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${WEB_BASE_URL}/${genre}/${slug}/transliterated`,
    },
  };
}

export default async function LyricsPage({
  params,
}: Readonly<{ params: Params }>) {
  const { slug, genre } = await params;
  const lyric = await getTransliteratedLyricsViaGenreSlug(slug, genre);

  if (!lyric) {
    notFound();
  }

  const lyricsChunks = lyric.transliteratedContent
    ? lyric.transliteratedContent.split("\n\n")
    : [];
  // eslint-disable-next-line react-hooks/purity
  let randomIndex = Math.floor(Math.random() * (lyricsChunks.length - 1));
  if (randomIndex === 1) {
    randomIndex++;
  }

  return (
    <>
      <LyricsChunks
        content={lyric.transliteratedContent}
        className={`${montserrat.className} py-10 pb-16 text-center`}
        textClassName="text-2xl leading-8 whitespace-pre-wrap md:text-4xl md:leading-12.5"
      />
      <LyricsDialogClient lyricId={lyric.id} />
      {lyric.poet?.slug && (
        <Suspense fallback={<Loader />}>
          <RenderPoetLyrics
            size={6}
            poetname={lyric.poet.name}
            poetslug={lyric.poet.slug}
            exclude={slug}
            preference="transliterated"
          />
        </Suspense>
      )}
    </>
  );
}
