"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Search from "./Search";

function Navbar() {

  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  return (
    <nav className="relative mx-auto mb-4 w-[90%] flex-col px-3 md:w-[92%] md:px-5 lg:w-[88%] xl:w-[85%]">
      <div
        className={`flex items-center ${showSearch ? "justify-center" : "justify-between"} gap-2 border-b-2`}
      >
        <Link
          href="/"
          className={`${showSearch ? "max-[520px]:hidden" : "max-[520px]:block"} block`}
        >
          <Image
            src="/images/midhah-lyrics-logo.svg"
            alt="Midhah Lyrics Logo"
            width={150}
            height={70}
          />
        </Link>
        
        <Search showSearch={showSearch} setShowSearch={setShowSearch} />

        <div className="hidden gap-8 lg:flex">
          <Link href="/">Home</Link>
          <Popover className="relative">
            <PopoverButton className="focus-within:outline-0">
              Genres <i className="bi bi-chevron-down text-xs"></i>
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="flex flex-col rounded-sm bg-white py-4 shadow-lg [--anchor-gap:4px]"
            >
              <Link
                href="/hamd"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Hamd e Ta&apos;ala
              </Link>
              <Link
                href="/naat"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Naat e Rasool
              </Link>
              <Link
                href="/manqbat"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Manqbat
              </Link>
              <Link
                href="/durood-o-salam"
                className="px-2.5 py-1 hover:bg-slate-100 lg:px-5"
              >
                Durood o Salam
              </Link>
            </PopoverPanel>
          </Popover>
          <Link href="/trending">Trending</Link>
          <Link href="/staff-picks">Staff Picks</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
