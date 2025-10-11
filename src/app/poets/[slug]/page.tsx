import RenderLyricsList from "@/src/components/RenderLyricsList";
import ViewCount from "@/src/components/ViewCount";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { headers } from "next/headers";
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

  const headersList = headers();
  const referer = (await headersList).get("referer");

  if (!poet) {
    notFound();
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg card relative mb-5 overflow-hidden md:rounded-[10px]">
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">{poet.name}</h1>
        </div>
      </div>

      <RenderLyricsList genre={slug} />

      <ViewCount
        entityId={poet.id}
        entityType="LYRICS"
        referer={`${referer}`}
      />
    </div>
  );
}

async function fetchPoet(
  slug: string,
): Promise<{ id: number; name: string } | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  ).then((response) => {
    return response.json();
  });

  if (res.data) {
    return res.data;
  }
  return null;
}
