import GooglePlayBadge from "./GooglePlayBadge";

const Jumbotron = () => {
  return (
    <div className="hero-bg relative overflow-hidden text-center text-white sm:mx-3 md:p-5">
      <div className="mx-auto py-[120px] md:col-span-3">
        <h1 className="mb-1 text-2xl md:mb-4 md:text-5xl">
          Explore the most <br /> authentic lyrics
        </h1>
        <p className="leading text-normal mx-auto py-4 font-normal md:col-span-9 md:text-xl">
          Midhah مدحة is the leading and most authentic platform for Naat <br />
          lyrics, in addition to Hamd, Manqbat, and Durood o Salam
        </p>

        <GooglePlayBadge location={"jumbotron"} />
      </div>
      <div className="product-device d-none d-md-block shadow-sm"></div>
      <div className="product-device product-device-2 d-none d-md-block shadow-sm"></div>
    </div>
  );
};

export default Jumbotron;
