import { getLyricsViaGenreSlug } from "@/app/[genre]/[slug]/service";
import { AppPromoBanner } from "@/components/AppPromoBanner";
import RenderPoetLyrics from "@/components/RenderPoetLyrics";
import ViewCount from "@/components/ViewCount";
import BannerAd from "@/components/ads/AdSense_BannerAd";
import Lyrics from "@/models/Lyrics";
import { WEB_BASE_URL } from "@/utilities/constants";
import { capitalize, getPageGenre } from "@/utilities/helpers";
import { noto_nastaliq_urdu } from "@midhah/utils/fonts";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { preload } from "react-dom";
import { Params } from "./@types";
import LyricsDialogClient from "./LyricsDialogClient";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics?page=0&size=5000&sortBy=id&orderBy=asc`,
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch lyrics: ${res.status} ${res.statusText}`,
      );
    }
    const lyrics = await res.json();

    return lyrics.data.map((lyric: Lyrics) => ({
      genre: String(lyric.genre),
      slug: String(lyric.slug),
    }));
  } catch (error) {
    console.error("Critical error in generateStaticParams:", error);

    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug, genre } = await params;
  const lyric = await getLyricsViaGenreSlug(slug, genre);

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
      siteName: "Midhah Lyrics",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
    alternates: {
      canonical: `${WEB_BASE_URL}/${genre}/${slug}`,
    },
  };
}

export default async function LyricsPage({
  params,
}: Readonly<{ params: Params }>) {
  preload("/images/pattern.png", { as: "image", fetchPriority: "high" });

  const { slug, genre } = await params;
  const genreInfo = getPageGenre(genre);
  const lyric = await getLyricsViaGenreSlug(slug, genre);

  if (!lyric) {
    notFound();
  }

  const lyricsChunks = lyric.content ? lyric.content.split("\n\n") : [];
  // eslint-disable-next-line react-hooks/purity
  let randomIndex = Math.floor(Math.random() * (lyricsChunks.length - 1));
  if (randomIndex === 1) {
    randomIndex++;
  }

  return (
    <div className="relative container mx-auto w-full md:w-[85%]">
      <div
        className="card relative overflow-hidden md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-15 text-center md:py-37.5">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {lyric.title}
          </h1>
          {lyric.poet && (
            <Link
              href={`/poets/${lyric.poet?.slug}`}
              prefetch={false}
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
          <React.Fragment key={Number(index)}>
            <p className="text-2xl leading-12 whitespace-pre-wrap md:text-4xl md:leading-18.5">
              {part.trim()}
            </p>

            {index === randomIndex && (
              <>
                <br />
                <AppPromoBanner />
              </>
            )}

            {index < lyricsChunks.length - 1 && (
              <p>
                <br />
              </p>
            )}
          </React.Fragment>
        ))}
      </div>
      <LyricsDialogClient lyricId={lyric.id} />
      {lyric.poet?.slug && (
        <RenderPoetLyrics
          size={6}
          poetname={lyric.poet.name}
          poetslug={lyric.poet.slug}
          exclude={slug}
        />
      )}
      <ViewCount entityId={lyric.id} entityType="LYRICS" />
    </div>
  );
}
