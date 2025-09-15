import { WEB_BASE_URL } from "@/src/utilities/constants";
import { getPageGenre } from "@/src/utilities/helpers";
import { ImageResponse } from "@vercel/og";
import { Params } from "./@types";
import { getLyrics } from "./service";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: Readonly<{ params: Params }>) {
  const { slug, genre } = await  params;
  const genereDetails = getPageGenre(genre);
  const lyrics = await getLyrics( slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          position: "relative",
          width: "100%",
          height: "100%",
          background: genereDetails.color,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: "0.15",
            backgroundImage: `url('${WEB_BASE_URL}/images/pattern.png')`,
            backgroundSize: "auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}
        ></div>
        <p
          style={{
            marginBottom: "-90px",
            textTransform: "capitalize",
            fontSize: "48px",
          }}
        >
          {genre}
        </p>

        <h4>{lyrics?.title}</h4>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${WEB_BASE_URL}/images/midhah.svg`}
          alt=""
          height={80}
          style={{
            position: "absolute",
            top: "40px",
            left: "40px",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
