import RenderLyricsList from "@/src/components/RenderLyricsList";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const poetInfo = await searchPoet(params.slug);
  const poetName = poetInfo!.name;

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
export default async function GenreListPage(props: Params) {
  const params = await props.params;
  const slug = params.slug;

  const poetInfo = await searchPoet(params.slug);

  if (!poetInfo) {
    notFound();
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg card relative mb-5 overflow-hidden md:rounded-[10px]">
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {poetInfo.name}
          </h1>
        </div>
      </div>

      <RenderLyricsList slug={slug} type="poet" />
    </div>
  );
}

async function searchPoet(slug: string): Promise<{ name: string } | null> {
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
