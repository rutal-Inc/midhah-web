import { CSSProperties, ReactNode } from "react";

type PageHeroProps = {
  /** "theme" for the site gradient, or a genre gradient CSS string. */
  gradient?: "theme" | (string & {});
  /** Overlay the girih pattern (the `card` utility). */
  pattern?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * The shared page hero shell — consolidates the six hand-copied hero blocks
 * (trending, staff-picks, poet, collection, genre, lyric pages).
 */
export default function PageHero({
  gradient = "theme",
  pattern = false,
  className = "",
  children,
}: Readonly<PageHeroProps>) {
  const isThemeGradient = gradient === "theme";
  const style: CSSProperties | undefined = isThemeGradient
    ? undefined
    : { background: gradient };

  return (
    <div
      className={`relative overflow-hidden md:rounded-[10px] ${isThemeGradient ? "theme-gradient" : ""} ${pattern ? "card" : ""} ${className}`}
      style={style}
    >
      <div className="py-15 text-center md:py-37.5">{children}</div>
    </div>
  );
}
