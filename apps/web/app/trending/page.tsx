import RenderFilteredList from "@/components/RenderFilteredList";
import { WEB_BASE_URL } from "@/utilities/constants";
import { capitalize } from "@/utilities/helpers";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
  const title = `${capitalize(
    "Trending Lyrics",
    "-",
  )} Lyrics | Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform`;
  const description = `Explore trending lyrics. Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.`;

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
      canonical: `${WEB_BASE_URL}/trending`,
    },
  };
}
export default async function TrendingLyricsPage() {
  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg relative mb-5 overflow-hidden md:rounded-[10px]">
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">Trending</h1>
          <p className="leading text-normal mx-auto py-4 font-normal text-white md:col-span-9 md:text-xl">
            Trending Now: Lyrics Everyone Loves 🎶
          </p>
        </div>
      </div>

      <RenderFilteredList size={16} type="trending" />
    </div>
  );
}
