import RenderLyricsList from "@/components/RenderLyricsList";
import { WEB_BASE_URL } from "@/utilities/constants";
import { capitalize, getPageGenre } from "@/utilities/helpers";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { preload } from "react-dom";

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const title = `${capitalize(
    params.genre,
    "-",
  )} Lyrics | Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform`;
  const description = `Explore your favorite ${params.genre} lyrics. Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.`;

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
      canonical: `${WEB_BASE_URL}/${params.genre}`,
    },
  };
}

type Params = {
  readonly params: Promise<{ genre: string }>;
};

export default async function GenreListPage(props: Params) {
  preload("/images/pattern.svg", { as: "image", fetchPriority: "high" });

  const params = await props.params;
  const genreSlug = params.genre;

  const genreInfo = getPageGenre(genreSlug);

  if (!genreInfo) {
    const res = await searchGenre(genreSlug);

    if (res) {
      permanentRedirect(`/${res.genre}/${genreSlug}`);
    } else {
      notFound();
    }
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div
        className="card relative mb-5 overflow-hidden md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-15 text-center md:py-37.5">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {genreInfo?.title}
          </h1>
        </div>
      </div>

      <RenderLyricsList genre={genreSlug} />
    </div>
  );
}

async function searchGenre(genre: string): Promise<{ genre: string } | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/search/genre/${genre}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      console.warn(`Search failed for ${genre}: ${response.status}`);
      return null;
    }

    const res = await response.json();

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    console.warn(`Fetch error in searchGenre: ${error}`);
  }

  return null;
}
