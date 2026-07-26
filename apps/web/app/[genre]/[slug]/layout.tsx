import BannerAd from "@/components/ads/AdSense_BannerAd";
import { RecordRead } from "@/components/RecentlyRead";
import PageHero from "@/components/ui/PageHero";
import Tooltip from "@/components/ui/Tooltip";
import ViewCount from "@/components/ViewCount";
import { getPageGenre } from "@/utilities/helpers";
import verifiedCheck from "@midhah/assets/ui/verified-check.svg";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { preload } from "react-dom";
import LyricsViewToggle from "./_components/LyricsViewToggle";
import { getLyricsViaGenreSlug } from "./_lib/service";
import { Params } from "./_lib/types";

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  preload("/images/pattern.svg", { as: "image", fetchPriority: "high" });

  const { slug, genre } = await params;

  const genreInfo = getPageGenre(genre);
  const lyric = await getLyricsViaGenreSlug(slug, genre);

  if (!lyric) {
    notFound();
  }

  return (
    <div className="relative container mx-auto w-full md:w-[85%]">
      <PageHero gradient={genreInfo?.color ?? "theme"} pattern>
        <h1 className="mb-1 text-center text-2xl text-white md:text-5xl">
          {lyric.title}
          {lyric.isVerified && (
            <Tooltip content="This lyric has been carefully verified against original published sources by our research team.">
              <Image
                src={verifiedCheck}
                alt="Verified"
                width={30}
                height={30}
                className="ml-2 inline-block h-7 w-7 pb-1 md:h-9 md:w-9"
              />
            </Tooltip>
          )}
        </h1>
        {lyric.poet && (
          <Link
            href={`/poets/${lyric.poet?.slug}`}
            prefetch={false}
            className="mx-auto py-4 font-normal text-white md:col-span-9 md:text-xl"
          >
            <h2 className="mt-2">{lyric.poet.name}</h2>
          </Link>
        )}
      </PageHero>
      <RecordRead title={lyric.title} genre={genre} slug={slug} />
      <LyricsViewToggle genre={genre} slug={slug} />

      <div className="py-10 text-center">
        <BannerAd adSlot="8493724848" adFormat="auto" />
      </div>
      {children}
      <ViewCount entityId={lyric.id} entityType="LYRICS" />
    </div>
  );
}
