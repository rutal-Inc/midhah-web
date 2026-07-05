import heroBg from "@/public/images/hero-bg.png";
import Image from "next/image";
import GooglePlayBadge from "./GooglePlayBadge";

const Jumbotron = () => {
  return (
    <div className="relative overflow-hidden text-center text-white sm:mx-3 md:p-5">
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="mx-auto py-30 md:col-span-3">
        <h1 className="mb-1 text-2xl md:mb-4 md:text-5xl">
          Explore the most <br /> authentic lyrics
        </h1>
        <p className="leading text-normal mx-auto py-4 font-normal md:col-span-9 md:text-xl">
          Midhah مدحة is the leading and most authentic platform for Naat <br />
          lyrics, in addition to Hamd, Manqbat, and Durood o Salam
        </p>

        <GooglePlayBadge location={"jumbotron"} />
      </div>
      <div className="product-device d-none d-md-block shadow-xs"></div>
      <div className="product-device product-device-2 d-none d-md-block shadow-xs"></div>
    </div>
  );
};

export default Jumbotron;
