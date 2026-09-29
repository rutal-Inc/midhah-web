"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Props = {
  adSlot: string;
  adFormat: string;
};

function BannerAd({ adSlot, adFormat }: Readonly<Props>) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("Error while loading banner ad", error);
    }
  }, [pathname]);

  // AdSense sets data-ad-status on the <ins> once it responds; spacing is only
  // applied when it's "filled", so an unfilled or blocked unit leaves no gap.
  return (
    <div className="text-center has-[ins[data-ad-status=filled]]:py-10">
      <ins
        key={pathname}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9810490020982461"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
export default BannerAd;
