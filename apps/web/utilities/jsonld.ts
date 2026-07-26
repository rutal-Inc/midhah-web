import { WEB_BASE_URL } from "./constants";

/**
 * Schema.org JSON-LD builders. Rendered via <JsonLd> in server components.
 * NOTE: the API exposes no datePublished/dateModified or language field on
 * lyric responses yet — those enrich these builders when available.
 */

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Midhah Lyrics",
    url: WEB_BASE_URL,
    logo: `${WEB_BASE_URL}/icons/icon-512.png`,
    sameAs: [
      "https://www.facebook.com/midhah.official",
      "https://x.com/midhahOfficial",
      "https://www.instagram.com/midhah.official/",
      "https://github.com/rutal-Inc/midhah-web",
    ],
  };
}

export function webSiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Midhah Lyrics",
    url: WEB_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${WEB_BASE_URL}/search?query={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      // "/" maps to the bare origin so every entity shares the exact same
      // URL string as Organization/WebSite (strict parsers string-compare).
      item: item.path === "/" ? WEB_BASE_URL : `${WEB_BASE_URL}${item.path}`,
    })),
  };
}

export function lyricJsonLd({
  title,
  genre,
  genreName,
  slug,
  transliterated,
  content,
  poet,
}: {
  title: string;
  /** URL slug of the genre (e.g. "durood-o-salam"). */
  genre: string;
  /** Display name of the genre (e.g. "Durood o Salam"). */
  genreName: string;
  slug: string;
  transliterated: boolean;
  /** Full lyric text for the schema `lyrics` property. */
  content?: string;
  poet?: { name: string; slug?: string };
}): JsonLdObject {
  const originalUrl = `${WEB_BASE_URL}/${genre}/${slug}`;
  const transliteratedUrl = `${originalUrl}/transliterated`;
  return {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    name: title,
    url: transliterated ? transliteratedUrl : originalUrl,
    // Page-level script variant, mirroring the hreflang pair. Verse-level
    // language is NOT claimed anywhere (see LyricsChunks) — kalam is often
    // multilingual (Arabic/Persian/Urdu/etc. verse by verse).
    inLanguage: transliterated ? "ur-Latn" : "ur",
    genre: genreName,
    ...(content && {
      lyrics: { "@type": "CreativeWork", text: content },
    }),
    // Cross-reference the script pair (closest schema.org relation for a
    // transliteration; hreflang carries the same pairing for crawlers).
    ...(transliterated
      ? {
          translationOfWork: {
            "@type": "CreativeWork",
            url: originalUrl,
            inLanguage: "ur",
          },
        }
      : {
          workTranslation: {
            "@type": "CreativeWork",
            url: transliteratedUrl,
            inLanguage: "ur-Latn",
          },
        }),
    ...(poet && {
      lyricist: {
        "@type": "Person",
        name: poet.name,
        ...(poet.slug && { url: `${WEB_BASE_URL}/poets/${poet.slug}` }),
      },
    }),
  };
}

export function poetJsonLd(poet: { name: string; slug: string }): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: poet.name,
    url: `${WEB_BASE_URL}/poets/${poet.slug}`,
    jobTitle: "Poet",
  };
}
