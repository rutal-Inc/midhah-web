import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Jumbotron />
      <Footer />
    </div>
  );
};

export default Home;
