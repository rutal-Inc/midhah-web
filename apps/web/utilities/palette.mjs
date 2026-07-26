/**
 * Single source of truth for the Midhah color system.
 *
 * Consumed by:
 *  - scripts/generate-theme-css.mjs → app/theme.generated.css (CSS vars + utilities)
 *  - utilities/constants.ts (genre gradients for page heroes)
 *  - app/[genre]/[slug]/_components/OgImage.tsx via constants.ts (@vercel/og
 *    cannot resolve CSS custom properties, so it needs these literals)
 *
 * Every scale is anchored on colors extracted from the two gradients that
 * predate the design system: the theme gradient (hero) and the genre gradients.
 * Anchor steps are marked. Plain ESM so build scripts can import it directly.
 */

export const scales = {
  // Deep blues from the theme gradient base (#376283, #244961) and the
  // Durood gradient end (#081B3E). Dark-mode surfaces, hero grounds, footer.
  midnight: {
    50: "#EEF2F7",
    100: "#DCE4EE",
    200: "#B9C9DC",
    300: "#8FA8C4",
    400: "#6485A6",
    500: "#476A8C",
    600: "#376283", // anchor: theme gradient base
    700: "#244961", // anchor: theme gradient layer 1
    800: "#16334A",
    900: "#102A45",
    950: "#081B3E", // anchor: Durood gradient end
  },
  // Brand teal from the theme gradient layer 3 (#087378) and the Durood
  // gradient start (#027278). Primary actions, links, active states.
  teal: {
    50: "#E6F5F5",
    100: "#C9E9EA",
    200: "#9AD5D7",
    300: "#66BCBF",
    400: "#35A0A5",
    500: "#16878D",
    600: "#087378", // anchor: theme gradient layer 3
    700: "#027278", // anchor: Durood gradient start
    800: "#045256",
    900: "#063B3E",
    950: "#04292C",
  },
  // Bright cyan from the theme gradient layer 2 (#06D2F8). Accents, focus
  // rings, highlights. Steps 600+ are the light-mode-safe (AA) variants.
  cyan: {
    50: "#E8FBFE",
    100: "#C8F5FD",
    200: "#93EAFB",
    300: "#4FDEFA",
    400: "#06D2F8", // anchor: theme gradient layer 2
    500: "#05B4D6",
    600: "#0895B3",
    700: "#0A7690",
    800: "#0D5D72",
    900: "#0E4A5B",
    950: "#08313D",
  },
  // Gold from the Manqbat gradient (#F7C638 → #B87129). The tazhīb
  // (illumination) accent: ornaments, dividers, verified badge.
  gold: {
    50: "#FEF8E6",
    100: "#FDEFC4",
    200: "#FBE297",
    300: "#F9D465",
    400: "#F7C638", // anchor: Manqbat gradient start
    500: "#D99C2B",
    600: "#B87129", // anchor: Manqbat gradient end
    700: "#A9761A", // deepened Manqbat start (AA for large white text)
    800: "#6B4310", // deepened Manqbat end
    900: "#4E3110",
    950: "#33200A",
  },
  // Warm ivory reserved for the lyric reading surface only.
  paper: {
    50: "#FDFCFA",
    100: "#FAF8F4",
    200: "#F3EFE7",
    300: "#E9E2D5",
  },
};

/**
 * The theme gradient — verbatim from the original `theme-gradient` utility.
 * `base` is the background-color underlay; `image` the radial layer stack.
 */
export const themeGradient = {
  base: "rgb(55 98 131)",
  image: [
    "radial-gradient(ellipse 67.4% 150.8% at 27.6% 103.2%, rgb(36 73 97 / 0.709) 0%, rgb(36 73 97 / 0) 100%)",
    "radial-gradient(ellipse 40.7% 68.1% at -3.5% -2.2%, rgb(6 210 248 / 0.789) 0%, rgb(6 210 248 / 0) 100%)",
    "radial-gradient(ellipse 81% 118.2% at 96.5% 3.8%, rgb(8 115 120 / 1) 0%, rgb(8 115 120 / 0) 100%)",
  ].join(",\n    "),
};

/**
 * Genre gradients — verbatim from the original genresInfo definitions.
 * NOTE: manqbat is scheduled to deepen to gold-700 → gold-800 for white-text
 * contrast when the genre surfaces are redesigned (wave B); until then the
 * original values ship untouched.
 */
export const genreGradients = {
  hamd: "linear-gradient(to bottom right, #2D2A2B, #1A1A1A)",
  naat: "linear-gradient(to bottom right, #1F605E, #319678)",
  manqbat: "linear-gradient(to bottom right, #F7C638, #B87129)",
  "durood-o-salam": "linear-gradient(to bottom right, #027278, #081B3E)",
};

/**
 * Semantic tokens, per theme. These flip with [data-theme] and are the ONLY
 * color vocabulary components should use (via bg-surface, text-ink, etc.).
 * Light values match the pre-redesign look exactly.
 */
export const semantic = {
  light: {
    surface: "#FFFFFF",
    "surface-raised": "#FFFFFF",
    "surface-sunken": "#F9FAFB",
    ink: "#111827",
    "ink-muted": "#4B5563",
    "ink-faint": "#9CA3AF",
    line: "#E5E7EB",
    "line-strong": "#D1D5DB",
    accent: scales.cyan[700],
    "accent-hover": scales.cyan[600],
    success: "#15803D",
    warning: "#B45309",
    danger: "#B91C1C",
    info: "#0E7490",
  },
  dark: {
    surface: "#0B1E33",
    "surface-raised": "#14304B",
    "surface-sunken": "#071626",
    ink: "#E7EEF5",
    "ink-muted": "#A9BCCE",
    "ink-faint": "#6E8399",
    line: "#23405C",
    "line-strong": "#33546F",
    accent: scales.teal[400],
    "accent-hover": scales.teal[300],
    success: "#4ADE80",
    warning: "#FBBF24",
    danger: "#F87171",
    info: "#38BDF8",
  },
};
