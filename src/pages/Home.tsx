import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "../components/Jumbotron";
import GenreCards from "../components/GenreCards";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const Home = () => {
  return (
    <div>
      <Navbar/>
      <Jumbotron />
      <GenreCards />
      <Footer/>
    </div>
  );
};

export default Home;
