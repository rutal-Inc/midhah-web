import { StaticImageData } from "next/image";

export default interface GenreInfo {
  title: string;
  color: string;
  image: StaticImageData;
  path: string;
}
