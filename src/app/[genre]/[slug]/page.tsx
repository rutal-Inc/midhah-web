import { AppPromoBanner } from "@/src/components/AppPromoBanner";
import RenderPoetLyrics from "@/src/components/RenderPoetLyrics";
import ViewCount from "@/src/components/ViewCount";
import BannerAd from "@/src/components/ads/AdSense_BannerAd";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize, getPageGenre } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { noto_nastaliq_urdu } from "../../fonts";
import { Params } from "./@types";
import LyricsDialogClient from "./LyricsDialogClient";
import { getLyrics } from "./service";

export async function generateStaticParams() {
  const lyrics: {
    data: {
      genre: string;
      slug: string;
    }[];
  } = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics?page=0&size=5000&sortBy=id&orderBy=asc`,
  ).then((res) => res.json());

  return lyrics.data.map((lyric) => ({
    genre: String(lyric.genre),
    slug: String(lyric.slug),
  }));
}

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
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  randomIndex == 1 && ++randomIndex;

  return (
    <div className="relative container mx-auto w-full md:w-[85%]">
      <div
        className="card relative overflow-hidden md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {lyric.title}
          </h1>
          {lyric.poet && (
            <Link
              href={`/poets/${lyric.poet?.slug}`}
              className="leading text-normal mx-auto py-4 font-normal text-white md:col-span-9 md:text-xl"
            >
              <h2 className="mt-2">{lyric.poet.name}</h2>
            </Link>
          )}
        </div>
      </div>
      <div className="py-10 text-center">
        <BannerAd adSlot="8493724848" adFormat="auto" />
      </div>
      <div
        className={`${noto_nastaliq_urdu.className} py-10 pb-16 text-center`}
      >
        {lyricsChunks.map((part, index) => (
          <React.Fragment key={index}>
            <p className="text-2xl leading-10 whitespace-pre-wrap md:text-4xl md:leading-[55px]">
              {part.trim()}
            </p>

            {index === randomIndex && (
              <>
                {/* <br />
                <br /> */}
                <AppPromoBanner />
              </>
            )}

            {index < lyricsChunks.length - 1 && (
              <p>
                {/* <br /> */}
                <br />
              </p>
            )}
          </React.Fragment>
        ))}
      </div>
      <LyricsDialogClient lyricId={lyric.id} />
      {lyric.poet && lyric.poet.slug && (
        <RenderPoetLyrics
          size={6}
          poetname={lyric.poet.name}
          poetslug={lyric.poet.slug}
        />
      )}
      <ViewCount
        entityId={lyric.id}
        entityType="LYRICS"
        referer={`${referer}`}
      />
    </div>
  );
}
