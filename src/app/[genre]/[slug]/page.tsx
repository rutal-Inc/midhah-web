import { AppPromoBanner } from "@/src/components/AppPromoBanner";
import ViewCount from "@/src/components/ViewCount";
import BannerAd from "@/src/components/ads/AdSense_BannerAd";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize, getPageGenre } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import React from "react";
import { noto_nastaliq_urdu } from "../../fonts";
import { Params } from "./@types";
import { getLyrics } from "./service";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, genre } = await params;
  const lyric = await getLyrics(slug);

  if (!lyric) {
    notFound();
  }

  const title = `${lyric.title} (${capitalize(
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
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: `${WEB_BASE_URL}/${genre}/${slug}`,
    },
  };
}

export default async function LyricsPage({
  params,
}: Readonly<{ params: Params }>) {
  const { slug, genre } = await params;
  const genreInfo = getPageGenre(genre);
  const lyric = await getLyrics(slug);

  const headersList = headers();
  const referer = (await headersList).get("referer");

  if (!lyric) {
    notFound();
  }

  const lyricsChunks = lyric.lyrics ? lyric.lyrics.split("\n\n") : [];
  let randomIndex = Math.floor(Math.random() * (lyricsChunks.length - 1));
  randomIndex == 1 && ++randomIndex;

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div
        className="card relative overflow-hidden md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {lyric.title}
          </h1>
          <Link 
          href={`/poets/${lyric.poet?.slug}`}
            className="leading text-normal mx-auto py-4 font-normal md:col-span-9 md:text-xl text-white">
            {lyric.poet.name}
          </Link>
        </div>
      </div>

      <div className="py-10 text-center">
        <BannerAd adSlot="8493724848" adFormat="auto" />
      </div>

      <div className={`${noto_nastaliq_urdu.className} py-10 text-center`}>
        {lyricsChunks.map((part, index) => (
          <React.Fragment key={index}>
            <p className="text-2xl leading-10 whitespace-pre-wrap md:text-4xl md:leading-[55px]">
              {part}
            </p>

            {index === randomIndex && (
              <>
                <br />
                <br />
                <AppPromoBanner />
              </>
            )}

            {index < lyricsChunks.length - 1 && (
              <p>
                <br />
                <br />
              </p>
            )}
          </React.Fragment>
        ))}
      </div>
      <ViewCount entityId={lyric.id} referer={`${referer}`} />
    </div>
  );
}
