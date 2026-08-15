import GenreInfo from "@/models/GenreInfo";
import { genresInfo } from "@/utilities/constants";
import Link from "next/link";

const GenreCards = () => {
  const renderCards = (card: GenreInfo, index: number) => {
    const Icon = card.icon;
    return (
      <div className="w-full gap-3 md:px-2" key={index}>
        <Link href={card.path}>
          <div
            className="card text-dark m-auto my-1 overflow-hidden rounded-3xl shadow-lg sm:col-8 sm:my-2 md:col-12 lg:my-3 lg:min-h-[300px]"
            style={{
              background: card.color,
            }}
          >
            <div className="flex w-full flex-row items-center justify-between px-5 py-2 sm:px-7 sm:py-3 md:px-10 lg:hidden lg:flex-col lg:flex-col-reverse lg:p-3">
              <div className="text-shadow-1 text-white">
                <h3 className="text-center text-xl font-semibold tracking-wide sm:text-2xl md:text-3xl lg:text-xl lg:font-bold">
                  {card.title}
                </h3>
              </div>
              <Icon
                role="img"
                aria-label={`Illustration for ${card.title}`}
                className="block h-36 w-36 text-white sm:h-40 sm:w-40 md:h-50 md:w-50 lg:w-8/10"
              />
            </div>
            <Icon
              role="img"
              aria-label={`Illustration for ${card.title}`}
              className="mx-auto mt-5 hidden w-3/4 text-white lg:block"
            />
            <div className="text-shadow-1 hidden p-3 text-white lg:block">
              <h3 className="text-center text-xl font-bold tracking-wide">
                {card.title}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-2 py-10 pt-10 md:pt-14 lg:px-2">
      <h2 className="mb-1 pl-4 text-2xl md:mb-4 md:text-4xl">
        Explore the Genres
      </h2>
      <p className="text-normal mb-6 pl-4 md:text-xl">
        Delve into and explore the lyrics of a diverse array of madh genres{" "}
      </p>
      <div className="place-item-center grid grid-cols-1 px-2 lg:grid-cols-5">
        {genresInfo.map((genre, index) => renderCards(genre, index))}
      </div>
    </div>
  );
};

export default GenreCards;
