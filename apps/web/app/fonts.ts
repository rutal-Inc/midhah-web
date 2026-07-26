import {
  Alegreya,
  Alegreya_Sans,
  Noto_Naskh_Arabic,
  Noto_Nastaliq_Urdu,
} from "next/font/google";

/**
 * Web font architecture (admin keeps packages/utils/src/fonts.ts).
 *
 * All fonts expose CSS variables consumed by the @theme --font-* tokens in
 * globals.css, so components use utilities (font-display, font-sans,
 * font-urdu, font-arabic) instead of importing font objects.
 */

/** Display serif for headings + transliterated verse (literary, true italics). */
export const alegreya = Alegreya({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alegreya",
});

/** UI sans companion for body text, labels, and controls. */
export const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-alegreya-sans",
});

/**
 * Urdu verse. The arabic subset carries the Nastaliq glyphs (this was
 * previously loaded with the latin subset — a bug that pushed every Urdu
 * glyph through unicode-range fallback requests). Nastaliq's extreme
 * vertical metrics make Next's synthesized fallback adjustments worse than
 * explicit line-height tokens, hence adjustFontFallback: false.
 */
export const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: "400",
  display: "swap",
  variable: "--font-nastaliq",
  adjustFontFallback: false,
});

/**
 * Arabic-with-i'rab content (clear harakat positioning). preload: false —
 * only lyric pages with Arabic text need it, so it must not cost the home
 * page a preload on mobile networks.
 */
export const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-naskh",
  preload: false,
});

export const fontVariables = `${alegreya.variable} ${alegreyaSans.variable} ${notoNastaliqUrdu.variable} ${notoNaskhArabic.variable}`;
