"use client";

import { useLyricsPreference } from "@/store/useLyricsPreference";
import * as Popover from "@radix-ui/react-popover";
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
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className="group fixed right-4 bottom-4 z-50 flex cursor-pointer items-center justify-center rounded-full border border-gray-100 bg-white p-2 shadow-lg focus-within:outline-0"
          aria-label="Open settings"
        >
          <SettingsIcon className="text-accent h-8 w-8 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align="end"
          sideOffset={8}
          className="z-50 flex w-64 flex-col rounded-2xl bg-white p-4 shadow-lg"
        >
          <h2 className="mb-2.5 text-start text-lg font-medium">
            Content Preferences
          </h2>
          <div className="flex w-full justify-center overflow-hidden rounded-md">
            <button
              onClick={() => handleSetPreference("original")}
              className={`flex w-full cursor-pointer items-center justify-center px-5 py-2 text-center text-sm font-medium transition ${
                preference === "original"
                  ? "bg-accent text-white"
                  : "text-accent bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Original
            </button>
            <button
              onClick={() => handleSetPreference("transliterated")}
              className={`flex w-full cursor-pointer items-center justify-center px-5 py-2 text-center text-sm font-medium transition ${
                preference === "transliterated"
                  ? "bg-accent text-white"
                  : "text-accent bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Transliterated
            </button>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
