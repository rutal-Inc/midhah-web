import RenderLyricsList from "@/src/components/RenderLyricsList";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize, getPageGenre } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

export function generateMetadata({ params }: Params): Metadata {
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
  readonly params: { genre: string };
};
export default async function GenreListPage({ params }: Params) {
  const genre = params.genre;

  const genreInfo = getPageGenre(params.genre);

  if (!genreInfo) {
    const res = await searchGenre(params.genre);

    if (res) {
      permanentRedirect(`/${res.genre}/${params.genre}`);
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
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {genreInfo?.title}
          </h1>
        </div>
      </div>

      <RenderLyricsList genre={genre} />
    </div>
  );
}

async function searchGenre(genre: string): Promise<{ genre: string } | null> {
  const res = await fetch(`https://api.midhah.com/v2/search/genre/${genre}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  }).then((response) => {
    return response.json();
  });

  if (res.data) {
    return res.data;
  }
  return null;
}
