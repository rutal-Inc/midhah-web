import Image from "next/image";
import Link from "next/link";
import GenreCard from "../models/GenreCard";

import bait_ullah from "../assets/bait-ullah.png";
import gosha_e_durood from "../assets/gosha-e-durood.png";
import roza_imam_hussain from "../assets/roza-e-imam-hussain.png";
import roza_e_rasool from "../assets/roza-e-rusool.png";

const GenreCards = () => {
  const cardInfo: GenreCard[] = [
    {
      title: "HAMD E TA'ALA",
      color: "linear-gradient(to bottom right, #2D2A2B, #1A1A1A)",
      image: bait_ullah,
      path: "hamd",
    },
    {
      title: "NAAT E RASOOL",
      color: "linear-gradient(to bottom right, #1F605E, #319678)",
      image: roza_e_rasool,
      path: "naat",
    },
    {
      title: "MANQBAT",
      color: "linear-gradient(to bottom right, #F7C638, #B87129)",
      image: roza_imam_hussain,
      path: "manqbat",
    },
    {
      title: "DUROOD O SALAM",
      color: "linear-gradient(to bottom right, #027278, #081B3E)",
      image: gosha_e_durood,
      path: "durood-o-salam",
    },
  ];

  const renderCards = (card: GenreCard, index: number) => {
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
      <div className="flex flex-wrap">{cardInfo.map(renderCards)}</div>
    </div>
  );
};

export default GenreCards;
