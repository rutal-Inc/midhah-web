import React from "react";
import baitUllah from "../assets/bait-ullah.png";
import rozaErusool from "../assets/roza-e-rusool.png";
import rozaeimamHussain from "../assets/roza-e-imam-hussain.png";
import goshaeDurood from "../assets/gosha-e-durood.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/GenreCards.css";

const GenreCards = () => {
  const cardInfo = [
    {
      title: " HAMD E TA'ALA",
      color: " linear-gradient(to bottom right, #2D2A2B, #1A1A1A)",
      Image: baitUllah,
    },
    {
      title: " NAAT E RASOOL",
      color: "linear-gradient(to bottom right, #1F605E, #319678)",
      Image: rozaErusool,
    },
    {
      title: "MANQBAT",
      color: "linear-gradient(to bottom right, #F7C638, #B87129)",
      Image: rozaeimamHussain,
    },
    {
      title: "DUROOD O SALAM",
      color: " linear-gradient(to bottom right, #027278, #081B3E)",
      Image: goshaeDurood,
    },
  ];
  const renderCards = (card, index) => {
    return (
      <div className="d-flex col-md-3" key={index}>
        <div
          className="card card-cover overflow-hidden text-dark rounded-4 shadow-lg m-auto"
          style={{ background: card.color, height: "325px" }}
        >
          <img
            src={card.Image}
            style={{ width: "75%", margin: "auto", marginTop: "20px" }}
          />
          <div className="d-flex align-items-center justify-content-center h-100 p-3 text-white text-shadow-1">
            <h3
              style={{
                whiteSpace: "nowrap",
                fontSize: "1.1rem",
                letterSpacing: "3px",
                fontWeight: "800",
              }}
            >
              {card.title}
            </h3>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        {cardInfo.map(renderCards)}
      </div>
    </div>
  );
};

export default GenreCards;
