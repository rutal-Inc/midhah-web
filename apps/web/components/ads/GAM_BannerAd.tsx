"use client";

import { useEffect, useState } from "react";

const AD_UNIT_PATH = "/23199224834/lyrics-page-top-banner-ad";
const DIV_ID = "div-gpt-ad-1790623368160-0";
const SIZES: Array<[number, number]> = [
  [168, 42],
  [728, 90],
  [750, 200],
  [120, 30],
  [120, 20],
  [960, 90],
  [300, 31],
  [980, 120],
  [980, 90],
  [320, 50],
  [750, 100],
  [220, 90],
  [970, 90],
  [300, 50],
  [750, 300],
  [930, 180],
  [970, 66],
  [320, 100],
  [950, 90],
  [300, 75],
  [234, 60],
  [216, 36],
  [216, 54],
  [292, 30],
  [168, 28],
  [300, 100],
];

type Props = {
  lyricId: number;
  poetId?: number | null;
};

function GAMBannerAd({ lyricId, poetId }: Readonly<Props>) {
  // Spacing is only applied once an ad actually renders, so an unfilled or
  // blocked slot leaves no gap in the page.
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    // Until gpt.js loads, googletag is just a command queue; queued callbacks
    // only run once the full API is available.
    const googletag = (window.googletag =
      window.googletag || ({ cmd: [] } as unknown as Googletag));
    let slot: GptSlot | null = null;

    const onRenderEnded = (event: GptSlotRenderEndedEvent) => {
      if (event.slot === slot) setFilled(!event.isEmpty);
    };

    googletag.cmd.push(() => {
      try {
        slot = googletag.defineSlot(AD_UNIT_PATH, SIZES, DIV_ID);
        if (!slot) return;

        const targeting: Record<string, string> = { lyric_id: String(lyricId) };
        if (poetId) targeting.poet_id = String(poetId);

        const pubads = googletag.pubads();
        pubads.addEventListener("slotRenderEnded", onRenderEnded);
        slot.addService(pubads).setConfig({ targeting });

        googletag.display(DIV_ID);
      } catch (error) {
        console.error("Error while loading GAM banner ad", error);
      }
    });

    return () => {
      googletag.cmd.push(() => {
        if (!slot) return;
        googletag
          .pubads()
          .removeEventListener("slotRenderEnded", onRenderEnded);
        googletag.destroySlots([slot]);
      });
    };
  }, [lyricId, poetId]);

  return (
    <div className={filled ? "py-10 text-center" : "text-center"}>
      <div id={DIV_ID} />
    </div>
  );
}
export default GAMBannerAd;
