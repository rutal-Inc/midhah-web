import RenderFilteredList from "@/src/components/RenderFilteredList";
import { WEB_BASE_URL } from "@/src/utilities/constants";
import { capitalize } from "@/src/utilities/helpers";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const title = `${capitalize(
    "Staff Picks",
    "-",
  )} Lyrics | Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform`;
  const description = `Explore staff picks lyrics. Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.`;

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
export default async function StaffPicksLyricsPage() {
  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg relative mb-5 overflow-hidden md:rounded-[10px]">
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">Staff Picks</h1>
          <p className="leading text-normal mx-auto py-4 font-normal text-white md:col-span-9 md:text-xl">
            Hidden Gems: Editor&apos;s Pick to Discover ✨
          </p>
        </div>
      </div>

      <RenderFilteredList size={16} type="staff-picks" />
    </div>
  );
}
