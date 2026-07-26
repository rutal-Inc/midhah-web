import bait_ullah from "@/components/icons/BaitUllah";
import gosha_e_durood from "@/components/icons/GoshaEDurood";
import roza_imam_hussain from "@/components/icons/RozaEImamHussain";
import roza_e_rasool from "@/components/icons/RozaERasool";
import GenreInfo from "@/models/GenreInfo";
import { genreGradients } from "@/utilities/palette.mjs";

export const genresInfo: GenreInfo[] = [
  {
    title: "HAMD E TA'ALA",
    color: genreGradients.hamd,
    icon: bait_ullah,
    path: "hamd",
  },
  {
    title: "NAAT E RASOOL",
    color: genreGradients.naat,
    icon: roza_e_rasool,
    path: "naat",
  },
  {
    title: "MANQBAT",
    color: genreGradients.manqbat,
    icon: roza_imam_hussain,
    path: "manqbat",
  },
  {
    title: "DUROOD O SALAM",
    color: genreGradients["durood-o-salam"],
    icon: gosha_e_durood,
    path: "durood-o-salam",
  },
];

export const WEB_BASE_URL = "https://lyrics.midhah.com";

export const promoLines = [
  "Why Screenshot When You Can Download? Get the App for Efficient Storage!",
  "No More Screenshots! Save Storage with Our Lyrics App!",
  "Free Up Space - Get Lyrics Without Bulky Screenshots!",
  "Stop Wasting Storage - Download Lyrics in Lightweight Text Format!",
  "More Lyrics, Less Storage - Install the App and Ditch the Screenshots!",
  "Your Lyrics, Even Offline - Install the App for Free!",
  "No Internet? No Problem! Get the App for Offline Lyrics!",
  "Offline Lyrics Anytime, Anywhere - Download the App Today!",
  "Never Be Without Your Favorite Lyrics - Get the App for Offline Access!",
  "Download Lyrics & Access Offline - Install Our App Now!",
  "Get Lyrics On-The-Go! Download Our App Now!",
  "Find Your Favorite Lyrics Anytime, Anywhere - Install the App Today!",
  "Instant Access to Thousands of Lyrics - Tap to Install!",
];
