import RenderLyricsListWithSr from "@/src/components/RenderLyricsListWithSr";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const title = `${capitalize(
    params.slug,
    "-",
  )} Lyrics | Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform`;
  const description = `Explore ${params.slug} lyrics. Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.`;

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
      canonical: `${WEB_BASE_URL}/${params.slug}`,
    },
  };
}

type Params = {
  readonly params: Promise<{ slug: string }>;
};
export default async function GenreListPage(props: Params) {
  const params = await props.params;
  const slug = params.slug;

  const poetInfo = searchPoet(params.slug);

  if (!poetInfo) {
      notFound();
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div
        className="hero-bg card relative mb-5 overflow-hidden md:rounded-[10px]"
      >
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {poetInfo.then((res)=> res?.name)}
          </h1>
        </div>
      </div>

      <RenderLyricsListWithSr slug={slug} />
    </div>
  );
}

async function searchPoet(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  )
  if (!res.ok) {
    console.error(`❌ Failed to fetch poet: ${res.statusText}`);
    return null;
  }
  const data = await res.json();

  if (data?.data) {
    return { name: data.data.name };
  }

  
}
