import { WEB_BASE_URL } from "@/utilities/constants";
import { ImageResponse } from "@vercel/og";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

interface GenerateOgImageOptions {
  title: string;
  genreLabel: string;
  color?: string;
}

export default function OgImage({
  title,
  genreLabel,
  color,
}: GenerateOgImageOptions) {
  return new ImageResponse(
    <div
      style={{
        fontSize: 60,
        position: "relative",
        width: "100%",
        height: "100%",
        background: color ?? "#111111",
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
      />
      <p
        style={{
          marginBottom: "-90px",
          textTransform: "capitalize",
          fontSize: "48px",
        }}
      >
        {genreLabel}
      </p>

      <h4>{title}</h4>

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
    </div>,
    { ...OG_IMAGE_SIZE },
  );
}
