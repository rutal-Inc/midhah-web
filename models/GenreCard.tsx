import { StaticImageData } from "next/image";

export default interface GenreCard {
  title: string;
  color: string;
  image: StaticImageData;
  path: string;
}
