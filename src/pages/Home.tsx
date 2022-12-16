import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "../components/Jumbotron";
import GenreCards from "../components/GenreCards";


const Home = () => {
  return (
    <div>
      <Jumbotron />
      <GenreCards />
    </div>
  );
};

export default Home;
