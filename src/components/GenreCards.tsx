import GenreInfo from "@/src/models/GenreInfo";
import { genresInfo } from "@/src/utilities/constants";
import Image from "next/image";
import Link from "next/link";

const GenreCards = () => {
  const renderCards = (card: GenreInfo, index: number) => {
    return (
      <div className="w-full gap-3 px-3 sm:w-1/2 md:w-1/3 lg:w-1/4" key={index}>
        <Link href={card.path}>
          <div
            className="card text-dark col-10 sm:col-8 md:col-12 m-auto my-3 overflow-hidden rounded-3xl shadow-lg"
            style={{
              background: card.color,
              minHeight: "300px",
            }}
          >
            <Image
              src={card.image}
              alt={`image for ${card.title}`}
              style={{ width: "75%", margin: "auto", marginTop: "20px" }}
            />
            <div className="text-shadow-1 p-3 text-white">
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
    <div className="container mx-auto py-10 pt-10 md:px-[70px] md:pt-14">
      <h2 className="mb-1 pl-4 text-2xl md:mb-4 md:text-4xl">
        Explore the Genres
      </h2>
      <p className="text-normal mb-6 pl-4 md:text-xl ">
        Delve into and explore the lyrics of a diverse array of madh genres{" "}
      </p>
      <div className="flex flex-wrap">{genresInfo.map(renderCards)}</div>
    </div>
  );
};

export default GenreCards;
