import "bootstrap/dist/css/bootstrap.min.css";

import GooglePlay from "../assets/Google_Play_Store_badge_EN.png";

const Jumbotron = () => {
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
      <div className="col-md-7 mx-auto my-5">
        <h1 className="display-4 fw-normal">
          Explore the most authentic lyrics
        </h1>
        <p className="col-md-9 mx-auto lead fw-normal">
          Midhah مدحة is the leading and most authentic platform for Naat
          lyrics, in addition to Hamd, Manqbat, and Durood o Salam
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=com.midhah.lyrics"
          target="_blank"
        >
          <img src={GooglePlay} alt="Get it on Google Play" />
        </a>
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default Jumbotron;
