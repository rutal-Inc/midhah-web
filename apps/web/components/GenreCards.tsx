import GenreInfo from "@/models/GenreInfo";
import { genresInfo } from "@/utilities/constants";
import Link from "next/link";

/** Genre browse tiles — 2-up on mobile, 4-up on desktop. */
const GenreCards = () => {
  const renderCard = (card: GenreInfo) => {
    const Icon = card.icon;
    return (
      <Link href={card.path} key={card.path} className="group block">
        <div
          className="card flex min-h-40 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl p-4 shadow-md transition-transform duration-200 group-hover:-translate-y-1 group-hover:shadow-lg sm:min-h-48 md:min-h-64"
          style={{ background: card.color }}
        >
          <Icon
            role="img"
            aria-label={`Illustration for ${card.title}`}
            className="block w-1/2 max-w-28 text-white md:max-w-36"
          />
          <h3 className="text-center text-sm font-bold tracking-wide text-white sm:text-base md:text-xl">
            {card.title}
          </h3>
        </div>
      </Link>
    );
  };

  return (
    <div className="container mx-auto px-3 py-10 md:px-17.5 md:pt-14">
      <h2 className="mb-1 text-2xl md:mb-2 md:text-4xl">Explore the Genres</h2>
      <p className="mb-6 md:text-xl">
        Delve into and explore the lyrics of a diverse array of madh genres
      </p>
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {genresInfo.map(renderCard)}
      </div>
    </div>
  );
};

export default GenreCards;
