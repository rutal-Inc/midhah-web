"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function TadaLottie({
  loader,
  interval = 10000,
  duration = 3050,
}: Readonly<{ loader: object; interval?: number; duration?: number }>) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    setShow(true);
    const initialTimer = setTimeout(() => setShow(false), duration);

    const loop = setInterval(() => {
      setShow(true);
      setTimeout(() => setShow(false), duration);
    }, interval);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loop);
    };
  }, [interval, duration]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center w-screen h-screen">
      {show && (
        <Lottie
          animationData={loader}
          loop={false}
          autoplay
          className="w-full h-full"
        />
      )}
    </div>
  );
}
