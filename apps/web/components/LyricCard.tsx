import { LyricPreference } from "@/store/useLyricsPreference";
import { montserrat, noto_nastaliq_urdu } from "@midhah/utils/fonts";
import Image from "next/image";
import Link from "next/link";
import { genresInfo } from "../utilities/constants";

interface LyricCardProps {
  title: string;
  genre: string;
  poet?: string;
  slug: string;
  preview: string;
  ref?: React.Ref<HTMLLIElement>;
  preference?: LyricPreference;
  isVerified: boolean;
}
const LyricCard = ({
  title,
  genre,
  slug,
  preview,
  ref,
  poet,
  preference = "original",
  isVerified,
}: LyricCardProps) => {
  const genreImage = genresInfo.find((g) => g.path === genre)?.image;
  return (
    <li className="group relative my-1 flex flex-row hover:block" ref={ref}>
      <Link
        href={
          preference === "transliterated"
            ? `/${genre}/${slug}/transliterated`
            : `/${genre}/${slug}`
        }
        prefetch={false}
      >
        <div className="flex flex-1 scale-100 cursor-pointer items-center p-4 select-none group-hover:scale-0 hover:bg-gray-50">
          <div className="flex w-full flex-row items-center">
            {genreImage && (
              <Image
                src={genreImage}
                alt={`image for ${title}`}
                className="w-[14%] invert filter md:w-[16%] lg:w-[12%]"
                style={{
                  margin: "auto",
                }}
              />
            )}
            <div className="mr-16 w-[90%] flex-1 pl-2">
              <h2 className="text-gray-600">
                {title}
                {isVerified && (
                  <Image
                    src={"/assets/verified-check.svg"}
                    alt="Verified"
                    width={18}
                    height={18}
                    className="ml-1.5 inline-block pb-1"
                  />
                )}
              </h2>
              <h3 className="text-sm text-gray-400 uppercase">
                {poet ? `${genre} BY ${poet}` : `${genre}`}
              </h3>
            </div>
          </div>
        </div>
        <div
          className={`${preference === "original" ? noto_nastaliq_urdu.className : montserrat.className} absolute top-1/2 -translate-y-1/2 scale-0 text-center whitespace-pre-wrap group-hover:z-10 group-hover:w-full group-hover:scale-100 group-hover:bg-slate-50 group-hover:py-4 group-hover:transition-all ${preference === "original" ? "text-3xl" : "text-[26px]"}`}
        >
          {preview}
        </div>
      </Link>
    </li>
  );
};

export default LyricCard;
