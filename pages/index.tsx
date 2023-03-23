import GenreCards from "@/components/GenreCards";
import Jumbotron from "@/components/Jumbotron";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform
        </title>
        <meta
          name="description"
          content="Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <main>
        <Jumbotron />
        <GenreCards />
      </main>
    </>
  );
}
