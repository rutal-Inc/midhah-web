import { AppPromoBanner } from "@/components/AppPromoBanner";
import { Fragment } from "react";

export default function LyricsChunks({
  content,
  className,
  textClassName,
  lang,
}: Readonly<{
  content: string | undefined;
  className: string;
  textClassName: string;
  /** BCP-47 tag for the verse ("ur" | "ur-Latn") — SEO + assistive tech. */
  lang?: string;
}>) {
  const chunks = content ? content.split("\n\n") : [];

  // eslint-disable-next-line react-hooks/purity
  let randomIndex = Math.floor(Math.random() * (chunks.length - 1));
  if (randomIndex === 1) {
    randomIndex++;
  }

  return (
    <div lang={lang} className={`${className} max-[640px]:px-2.5`}>
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
