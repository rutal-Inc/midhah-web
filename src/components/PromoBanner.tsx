"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import googlePlayBadge from "../assets/google-play-badge.png";
import { promoLines } from "../utilities/constants";

export const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState<Boolean>(true);
  const [selectedPromo, setSelectedPromo] = useState<string>("");

  useEffect(() => {
    const randomLine =
      promoLines[Math.floor(Math.random() * promoLines.length)];
    setSelectedPromo(randomLine);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="flex justify-center">
          <br />
          <div className="hero-bg relative mx-2 my-6 flex w-full flex-col items-center justify-between gap-2 rounded-lg p-5 text-white shadow-lg md:mx-auto md:w-3/4 md:flex-row md:gap-10 lg:w-3/5 lg:p-7">
            <p className="flex items-center text-left text-lg font-medium md:font-semibold">
              {selectedPromo}
            </p>
            <a
              href="https://play.google.com/store/apps/details?id=com.midhah.lyrics"
              target="_blank"
              className="w-12 min-w-20 md:w-40 lg:w-auto"
            >
              <Image
                src={googlePlayBadge}
                alt="Get it on Google Play"
                width="150"
                height="44"
                className="mx-auto inline-block"
              />
            </a>
            <button
              onClick={handleClose}
              className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-transparent text-white ring-0 ring-white hover:text-gray-300"
              aria-label="Close banner"
              title="Close banner"
            >
              <i className="bi bi-x flex text-2xl"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
