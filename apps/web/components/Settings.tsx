"use client";

import { useLyricsPreference } from "@/store/useLyricsPreference";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import { SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function Settings() {
  const [mounted, setMounted] = useState(false);
  const { preference, setPreference } = useLyricsPreference();

  useEffect(() => {
    useLyricsPreference.persist.rehydrate();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleSetPreference = (value: "original" | "transliterated") => {
    setPreference(value);
  };

  return (
    <Popover className="fixed right-4 bottom-4 z-50">
      <PopoverButton
        className="group flex cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white p-2 shadow-lg focus-within:outline-0"
        aria-label="Open settings"
      >
        <SettingsIcon className="h-8 w-8 text-[#027278] transition-transform duration-200 group-data-[headlessui-state~=open]:rotate-180" />
      </PopoverButton>

      <PopoverPanel
        anchor="top end"
        className="flex w-64 flex-col rounded-2xl bg-white p-4 shadow-lg [--anchor-gap:8px]"
      >
        <h2 className="mb-2.5 text-start text-lg font-medium">
          Content Preferences
        </h2>
        <div className="flex w-full justify-center overflow-hidden rounded-md">
          <button
            onClick={() => handleSetPreference("original")}
            className={`flex w-full cursor-pointer items-center justify-center px-5 py-2 text-center text-sm font-medium transition ${
              preference === "original"
                ? "bg-teal-700 text-white"
                : "bg-gray-100 text-teal-700 hover:bg-gray-200"
            }`}
          >
            Original
          </button>
          <button
            onClick={() => handleSetPreference("transliterated")}
            className={`flex w-full cursor-pointer items-center justify-center px-5 py-2 text-center text-sm font-medium transition ${
              preference === "transliterated"
                ? "bg-teal-700 text-white"
                : "bg-gray-100 text-teal-700 hover:bg-gray-200"
            }`}
          >
            Transliterated
          </button>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
