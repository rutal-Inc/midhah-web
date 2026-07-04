import { fetchPoet } from "@/app/poets/[slug]/service";
import BannerAd from "@/components/ads/AdSense_BannerAd";
import RenderPoetsLyricsList from "@/components/RenderPoetsLyricsList";
import ViewCount from "@/components/ViewCount";
import { WEB_BASE_URL } from "@/utilities/constants";
import { capitalize } from "@/utilities/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const poet = await fetchPoet(params.slug);
  const poetName = poet!.name;

  const title = `${capitalize(
    poetName,
    " ",
  )} Lyrics | Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform`;
  const description = `Explore ${poetName} lyrics on Midhah مدحة — the most authentic platform for Hamd, Naat, Nasheed, Manqabat, and Durood o Salam. Download now on Google Play.`;

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
      canonical: `${WEB_BASE_URL}/poets/${params.slug}`,
    },
  };
}

type Params = {
  readonly params: Promise<{ slug: string }>;
};
export default async function PoetLyricsPage(props: Params) {
  const params = await props.params;
  const slug = params.slug;

  const poet = await fetchPoet(params.slug);

  if (!poet) {
    notFound();
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg card relative mb-5 overflow-hidden md:rounded-[10px]">
        <div className="py-15 text-center md:py-37.5">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">{poet.name}</h1>
        </div>
      </div>
      <div className="py-10 text-center">
        <BannerAd adSlot="9551075709" adFormat="auto" />
      </div>

      <RenderPoetsLyricsList slug={slug} />

      <ViewCount entityId={poet.id} entityType="POET" />
    </div>
  );
}
