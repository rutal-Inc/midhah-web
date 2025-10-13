"use client";

import Image from "next/image";
import googlePlayBadge from "../assets/google-play-badge.png";

export default function GooglePlayBadge({ location }: { location: string }) {
  const handleClick = () => {
    window.gtag("event", "google_play_badge_click", {
      location,
    });
  };

  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.midhah.lyrics"
      target="_blank"
      onClick={handleClick}
    >
      <Image
        src={googlePlayBadge}
        alt="Get it on Google Play"
        width="150"
        height="44"
        className="mx-auto inline-block"
      />
    </a>
  );
}
