import GenreInfo from "@/src/models/GenreInfo";
import { genresInfo } from "@/src/utilities/constants";
import Image from "next/image";
import Link from "next/link";

const GenreCards = () => {
  const renderCards = (card: GenreInfo, index: number) => {
    return (
      <div className="gap-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3" key={index}>
        <Link href={card.path}>
          <div
            className="card overflow-hidden text-dark rounded-3xl shadow-lg m-auto  col-10 sm:col-8 md:col-12 my-3"
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
            <div className="p-3 text-white text-shadow-1">
              <h3 className="text-center text-xl tracking-wide font-bold">
                {card.title}
              </h3>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div className="container pt-10 md:pt-14 mx-auto py-10 md:px-[70px]">
      <h2 className="text-2xl md:text-4xl mb-1 md:mb-4 pl-4">
        Explore the Genres
      </h2>
      <p className="text-normal md:text-xl mb-6 pl-4 ">
        You can search and explore the wide range of madh genres{" "}
      </p>
      <div className="flex flex-wrap">{genresInfo.map(renderCards)}</div>
    </div>
  );
};

export default GenreCards;
