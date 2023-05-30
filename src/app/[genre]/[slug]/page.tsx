import Lyrics from "@/src/models/Lyrics";
import { genresInfo } from "@/src/utilities/constants";
import { capitalize } from "@/src/utilities/helpers";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const lyric = await getLyrics(params.genre, params.slug);

  const title = `${lyric.title} (${capitalize(
    lyric.genre,
    "-"
  )}) | Midhah Lyrics`;

  return {
    title,
    description: `Read the lyrics of ${lyric.genre} ${lyric.title}. Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.`,
    openGraph: {
      title,
      type: "website",
      siteName: "Midhah Lyrics",
    },
    twitter: {
      creator: "@midhahOfficial",
    },
  };
}

const getLyrics = async (
  genre: string,
  slug: string
): Promise<Lyrics | never> => {
  const res = await fetch(`https://api.midhah.com/v2/lyrics/${genre}/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });

  if (res.data) {
    return res.data[0] as Lyrics;
  } else {
    notFound();
  }
};

function getPageGenre(genre: string) {
  return genresInfo.filter((genreInfo) => genreInfo.path === genre)[0];
}

type Params = {
  params: {
    genre: string;
    slug: string;
  };
};

export default async function LyricsPage({ params }: Params) {
  const lyric = await getLyrics(params.genre, params.slug);

  const genreInfo = getPageGenre(params.genre);

  return (
    <div className="container mx-auto  w-full md:w-[85%] ">
      <div
        className="relative overflow-hidden naat card md:rounded-[10px]"
        style={{ background: genreInfo?.color }}
      >
        <div className="py-[60px] md:py-[150px] text-center">
          <h1 className="text-2xl md:text-5xl mb-1 text-white">
            {lyric.title}
          </h1>
        </div>
      </div>
      <p className="whitespace-pre-wrap text-2xl md:text-4xl text-center py-10 poetry leading-10 md:leading-[55px]">
        {lyric.lyrics}
      </p>
    </div>
  );
}
