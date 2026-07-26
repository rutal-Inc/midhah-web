import { ImageResponse } from "@vercel/og";
import { OG_MARK, OG_PATTERN } from "./og/assets.generated";

export const OG_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

interface GenerateOgImageOptions {
  title: string;
  genreLabel: string;
  color?: string;
}

// The OG images are baked into the bundle as data URIs (see
// scripts/generate-og-assets.mjs). They used to be fetched from absolute
// lyrics.midhah.com URLs, which made dev and preview deployments depend on
// production and left Satori rasterising a remote SVG.
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
          backgroundImage: `url('${OG_PATTERN}')`,
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
        src={OG_MARK}
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
