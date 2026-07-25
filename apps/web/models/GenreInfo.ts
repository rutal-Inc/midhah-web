import { ComponentType, SVGProps } from "react";

export default interface GenreInfo {
  title: string;
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
}
