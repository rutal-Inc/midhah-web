import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/midhah-lyrics-logo.svg";

const Navbar = () => {
  return (
    <>
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center mb-4 border-bottom">
          <a href="/">
            <img src={logo} alt="Midhah Lyrics Logo" height="70px" />
          </a>
        </header>
      </div>
    </>
  );
};

export default Navbar;
