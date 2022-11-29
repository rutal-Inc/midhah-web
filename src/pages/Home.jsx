import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import GenreCards from "../components/GenreCards";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />

      <div className="container">
        <GenreCards />;
      </div>
      <hr />
    </div>
  );
};

export default Home;
