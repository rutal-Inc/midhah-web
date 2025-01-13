"use client";

import { useEffect } from "react";

type Props = {
  adSlot: string;
  adFormat: string;
};

function BannerAd({ adSlot, adFormat }: Readonly<Props>) {
  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (error) {
      console.error("Error while loading banner ad", error);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-9810490020982461"
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    ></ins>
  );
}
export default BannerAd;
