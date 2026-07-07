import { AppPromoBanner } from "@/components/AppPromoBanner";
import { Fragment } from "react";

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
    <div className={className}>
      {chunks.map((part, index) => (
        <Fragment key={Number(index)}>
          <p className={textClassName}>{part.trim()}</p>

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
