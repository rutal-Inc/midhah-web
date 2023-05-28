import Image from "next/image";

const Jumbotron = () => {
  return (
    <div className="relative overflow-hidden sm:mx-3 md:p-5 text-center bg-gray-100">
      <div className="md:col-span-3 mx-auto py-[120px] ">
        <h2 className="text-2xl md:text-5xl mb-1 md:mb-4 ">
          Explore the most <br /> authentic lyrics
        </h2>
        <p className="md:col-span-9 mx-auto leading text-normal md:text-xl font-normal py-4">
          Midhah مدحة is the leading and most authentic platform for Naat <br />
          lyrics, in addition to Hamd, Manqbat, and Durood o Salam
        </p>
        <a
          href="https://play.google.com/store/apps/details?id=com.midhah.lyrics"
          target="_blank"
        >
          <Image
            src="/images/Google_Play_Store_badge_EN.png"
            alt="Get it on Google Play"
            width="150"
            height="44"
            className="mx-auto inline-block"
          />
        </a>
      </div>
      <div className="product-device shadow-sm d-none d-md-block"></div>
      <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
    </div>
  );
};

export default Jumbotron;
