import Image from "next/image";
import downloadsScreen from "../assets/screenshots/downloads-screen.jpeg";
import homeScreen from "../assets/screenshots/home-screen.jpeg";
import listingScreen from "../assets/screenshots/listing-screen.jpeg";
import lyricsScreen from "../assets/screenshots/lyrics-screen.jpeg";
import searchScreen from "../assets/screenshots/search-screen.jpeg";

export default function FeatureCards() {
  return (
    <div className="bg-floral-frame overflow-hidden bg-slate-200">
      <div className="mx-auto py-10 pt-10 2xl:container md:px-[70px] md:pt-14">
        <h2 className="mb-1 pl-4 text-2xl md:mb-4 md:text-4xl">
          Discover Uncharted Devotion
        </h2>
        <p className="text-normal mb-6 pl-4 md:text-xl ">
          Dive into diverse, authentic, and immersive lyrical experiences with
          our app
        </p>

        <div className="m-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="order-1 flex flex-col justify-between bg-slate-100 px-4 pt-4">
            <div className="my-4 py-4 text-center">
              <h3 className="mb-3 text-2xl md:text-4xl">Pure Poetic Purity</h3>
              <p className="text-normal md:text-xl">
                Ensuring authenticity—experience the genuine words of poets,
                untouched and true
              </p>
            </div>
            <div className="mx-auto h-80 max-w-[60%] overflow-hidden sm:max-w-[50%] md:h-96 lg:h-80 xl:max-w-[40%]">
              <Image
                src={lyricsScreen}
                alt="home screen"
                className="aspect-9/16 rounded-3xl border-8 border-y-10 border-gray-800"
              />
            </div>
          </div>

          <div className="order-2 flex flex-col justify-between bg-primary px-4 pt-4">
            <div className="my-4 py-4 text-center text-white">
              <h3 className="mb-3 text-2xl md:text-4xl">At Your Fingertips</h3>
              <p className="text-normal md:text-xl">
                Unleash the power of precision with our state-of-the-art search
                functionality
              </p>
            </div>
            <div className="mx-auto h-80 max-w-[60%] overflow-hidden sm:max-w-[50%] md:h-96 lg:h-80 xl:max-w-[40%]">
              <Image
                src={searchScreen}
                alt="search screen"
                className="aspect-9/16 rounded-3xl border-8 border-y-10 border-gray-800"
              />
            </div>
          </div>

          <div className="order-4 flex flex-col justify-between bg-primary px-4 pt-4 lg:order-3">
            <div className="my-4 py-4 text-center text-white">
              <h3 className="mb-3 text-2xl md:text-4xl">Offline Access</h3>
              <p className="text-normal md:text-xl">
                Capture the essence offline—download app and access your
                favorite verses anytime, anywhere
              </p>
            </div>
            <div className="mx-auto h-80 max-w-[60%] overflow-hidden sm:max-w-[50%] md:h-96 lg:h-80 xl:max-w-[40%]">
              <Image
                src={downloadsScreen}
                alt="home screen"
                className="aspect-9/16 rounded-3xl border-8 border-y-10 border-gray-800"
              />
            </div>
          </div>

          <div className="order-3 flex flex-col justify-between bg-slate-300 px-4 pt-4 lg:order-4">
            <div className="my-4 py-4 text-center">
              <h3 className="mb-3 text-2xl md:text-4xl">Lyrical Oasis</h3>
              <p className="text-normal md:text-xl">
                A vast collection spanning Hamd, Naat, Manqabat, and Durood o
                Salam—thousands of lyrical gems await
              </p>
            </div>
            <div className="mx-auto h-80 max-w-[60%] overflow-hidden sm:max-w-[50%] md:h-96 lg:h-80 xl:max-w-[40%]">
              <Image
                src={listingScreen}
                alt="home screen"
                className="aspect-9/16 rounded-3xl border-8 border-y-10 border-gray-800"
              />
            </div>
          </div>

          <div className="order-5 flex flex-col justify-between bg-slate-100 px-4 pt-4">
            <div className="my-4 py-4 text-center">
              <h3 className="mb-3 text-2xl md:text-4xl">Interactive Harmony</h3>
              <p className="text-normal md:text-xl">
                Embark on a seamless lyrical journey with our user-friendly
                interface
              </p>
            </div>
            <div className="mx-auto h-80 max-w-[60%] overflow-hidden sm:max-w-[50%] md:h-96 lg:h-80 xl:max-w-[40%]">
              <Image
                src={homeScreen}
                alt="home screen"
                className="aspect-9/16 rounded-3xl border-8 border-y-10 border-gray-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
