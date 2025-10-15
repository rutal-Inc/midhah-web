import Image from "next/image";
import Link from "next/link";
import { noto_nastaliq_urdu } from "../app/fonts";
import { genresInfo } from "../utilities/constants";

interface LyricCardProps {
  title: string;
  genre: string;
  poet?: string;
  slug: string;
  preview: string;
  ref?: React.Ref<HTMLLIElement>;
}
const LyricCard = ({
  title,
  genre,
  slug,
  preview,
  ref,
  poet,
}: LyricCardProps) => {
  const genreImage = genresInfo.find((g) => g.path === genre)?.image;

  return (
    <Link href={`/${genre}/${slug}`}>
      <li className="group relative my-1 flex flex-row hover:block" ref={ref}>
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
              <h2 className="text-gray-600">{title}</h2>
              <h3 className="text-sm text-gray-400 uppercase">
                {poet ? `${genre} BY ${poet}` : `${genre}`}
              </h3>
            </div>
          </div>
        </div>
        <div
          className={`${noto_nastaliq_urdu.className} absolute top-1/2 -translate-y-1/2 scale-0 text-center text-3xl whitespace-pre-wrap group-hover:z-10 group-hover:w-full group-hover:scale-100 group-hover:bg-slate-50 group-hover:py-4 group-hover:transition-all`}
        >
          {preview}
        </div>
      </li>
    </Link>
  );
};

export default LyricCard;
