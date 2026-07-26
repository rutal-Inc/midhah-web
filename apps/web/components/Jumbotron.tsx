import HeroSearch from "./HeroSearch";

/** Search-first home hero: the hero IS the search. */
const Jumbotron = () => {
  return (
    <div className="theme-gradient card relative overflow-hidden text-center text-white sm:mx-3 md:rounded-[10px]">
      <div className="mx-auto flex flex-col items-center gap-2 px-3 py-14 md:py-24">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Explore the most authentic lyrics
        </h1>
        <p className="mb-6 max-w-2xl font-normal text-white/85 md:text-xl">
          Hamd, Naat, Manqbat and Durood o Salam — in Urdu script and Roman
          transliteration
        </p>
        <HeroSearch />
      </div>
    </div>
  );
};

export default Jumbotron;
