import GenreInfo from "@/src/models/GenreInfo";

import bait_ullah from "@/src/assets/bait-ullah.png";
import gosha_e_durood from "@/src/assets/gosha-e-durood.png";
import roza_imam_hussain from "@/src/assets/roza-e-imam-hussain.png";
import roza_e_rasool from "@/src/assets/roza-e-rusool.png";

export const genresInfo: GenreInfo[] = [
  {
    title: "HAMD E TA'ALA",
    color: "linear-gradient(to bottom right, #2D2A2B, #1A1A1A)",
    image: bait_ullah,
    path: "hamd",
  },
  {
    title: "NAAT E RASOOL",
    color: "linear-gradient(to bottom right, #1F605E, #319678)",
    image: roza_e_rasool,
    path: "naat",
  },
  {
    title: "MANQBAT",
    color: "linear-gradient(to bottom right, #F7C638, #B87129)",
    image: roza_imam_hussain,
    path: "manqbat",
  },
  {
    title: "DUROOD O SALAM",
    color: "linear-gradient(to bottom right, #027278, #081B3E)",
    image: gosha_e_durood,
    path: "durood-o-salam",
  },
];

export const WEB_BASE_URL = "https://lyrics.midhah.com";
