"use client";

import { X } from "lucide-react";
import { useState } from "react";
import DialogShell from "./ui/DialogShell";

const AdBanner = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  if (!visible) return null;

  return (
    <div className="theme-gradient relative flex items-center justify-center p-2">
      <p className="max-w-[86vw] text-sm text-white sm:text-base">
        We&apos;ve added ads to help keep the platform running and improving for
        you.{" "}
        <button
          className="cursor-pointer underline underline-offset-2"
          onClick={() => setDialogOpen(true)}
        >
          Learn More
        </button>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-2 max-w-[10vw] cursor-pointer p-1 transition-all hover:bg-black/30 sm:right-4"
        aria-label="Dismiss banner"
      >
        <X className="h-4 w-4 text-white" />
      </button>

      <DialogShell
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Why We Show Ads – Serving You with Authentic Spiritual Content"
        wide
      >
        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <h2 className="text-base font-bold text-gray-900">Our Purpose</h2>
          <p>
            We are dedicated to providing the most authentic lyrics of Hamd,
            Naat, Manqbat, and Darood o Salam, so that naat singers and reciters
            can access accurate content with ease and confidence.
          </p>
          <p>
            While we understand that ads can sometimes feel disruptive, we
            deeply appreciate your patience. These ads are not placed for profit
            or personal gain; rather, they help us cover the essential costs of
            keeping this platform alive and improving.
          </p>
          <p className="font-bold">Ad revenue is solely used for: </p>
          <ul className="list-disc pl-10">
            <li>Website development and ongoing maintenance</li>
            <li>Server hosting and related expenses</li>
            <li>Continuous improvements and feature updates</li>
            <li>Content creation and curation</li>
          </ul>
          <p>
            We strive to make this platform accessible and sustainable, purely{" "}
            <span className="font-bold">Liwajhillah</span> (for the sake of
            Allah Almighty), with the intention of serving the Ummah and
            supporting those who spread Islamic messages through their
            voices.{" "}
          </p>
          <p>
            We are sincerely grateful for your understanding and continued
            support. Our commitment remains to provide you with user-friendly,
            accurate, and spiritually meaningful content that strengthens your
            recitation and connects you to faith in a seamless way.
          </p>
        </div>
      </DialogShell>
    </div>
  );
};

export default AdBanner;
