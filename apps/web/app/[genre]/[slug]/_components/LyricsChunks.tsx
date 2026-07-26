import { AppPromoBanner } from "@/components/AppPromoBanner";
import { Fragment } from "react";

// TODO(i18n/SEO): add `lang` attributes to verse blocks once the API exposes
// language codes. A single page-level tag is NOT enough: kalam is frequently
// multilingual — e.g. /naat/lam-yati-nazeero-kafi-nazarin carries verses in
// four languages (Arabic, Persian, Urdu, Hindi/Punjabi). The right backend
// shape is a per-chunk language code (content as [{ text, lang }] or a
// parallel `languages: string[]` aligned with the "\n\n" chunks), letting each
// <p> below get its own BCP-47 `lang` (with the "-Latn" suffix applied on the
// transliterated route). Until then we deliberately claim nothing — a wrong
// lang hint is worse for assistive tech and search than none.
export default function LyricsChunks({
  content,
  className,
  textClassName,
}: Readonly<{
  content: string | undefined;
  className: string;
  textClassName: string;
}>) {
  const chunks = content ? content.split("\n\n") : [];

  // eslint-disable-next-line react-hooks/purity
  let randomIndex = Math.floor(Math.random() * (chunks.length - 1));
  if (randomIndex === 1) {
    randomIndex++;
  }

  return (
    <div className={`${className} max-[640px]:px-2.5`}>
      {chunks.map((part, index) => (
        <Fragment key={Number(index)}>
          <p dir="auto" className={textClassName}>
            {part.trim()}
          </p>

          {index === randomIndex && (
            <>
              <br />
              <AppPromoBanner />
            </>
          )}

          {index < chunks.length - 1 && (
            <p>
              <br />
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
}
