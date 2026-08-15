import { ComponentType, SVGProps } from "react";

export default interface GenreInfo {
  title: string;
  nav_title: string;
  color: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path: string;
}
