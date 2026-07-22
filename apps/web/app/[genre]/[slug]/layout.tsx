import BannerAd from "@/components/ads/AdSense_BannerAd";
import ViewCount from "@/components/ViewCount";
import { getPageGenre } from "@/utilities/helpers";
import { Tooltip } from "@radix-ui/themes";
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
      <div
        className="card relative overflow-hidden md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-15 text-center md:py-37.5">
          <h1 className="mb-1 text-center text-2xl text-white md:text-5xl">
            {lyric.title}
            {lyric.isVerified && (
              <Tooltip content="This lyric has been carefully verified against original published sources by our research team.">
                <Image
                  src={"/assets/verified-check.svg"}
                  alt="Verified"
                  width={24}
                  height={24}
                  className="ml-1 inline-block pb-1"
                />
              </Tooltip>
            )}
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
      <LyricsViewToggle genre={genre} slug={slug} />

      <div className="py-10 text-center">
        <BannerAd adSlot="8493724848" adFormat="auto" />
      </div>
      {children}
      <ViewCount entityId={lyric.id} entityType="LYRICS" />
    </div>
  );
}
