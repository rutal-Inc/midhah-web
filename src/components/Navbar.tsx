"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchDialog from "./Search";

function Navbar() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <nav className="relative mx-auto mb-4 flex w-[85%] items-center justify-between border-b-2 px-5">
      <Link href="/">
        <Image
          src="/images/midhah-lyrics-logo.svg"
          alt="Midhah Lyrics Logo"
          width={150}
          height={70}
        />
      </Link>

      <button
        aria-label="Search your favorite midhah lyrics"
        className="rounded-md px-3.5 py-2 ring-1 hover:bg-gray-100 md:pr-7"
        onClick={openModal}
      >
        <i className="bi bi-search md:mr-1"></i>{" "}
        <span className="hidden md:inline">Search fav madh lyrics...</span>
      </button>
      <SearchDialog show={isOpen} closeModal={closeModal} />

      <div className="hidden gap-8 md:flex">
        <Link href="/">Home</Link>
        <Popover className="relative">
          <PopoverButton className=" focus-within:outline-0">
            Genres <i className="bi bi-chevron-down text-xs"></i>
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex flex-col rounded bg-white py-4 shadow-lg [--anchor-gap:4px]"
          >
            <Link href="/hamd" className="px-5 py-1 hover:bg-slate-100">
              Hamd e Ta&apos;ala
            </Link>
            <Link href="/naat" className="px-5 py-1 hover:bg-slate-100">
              Naat e Rasool
            </Link>
            <Link href="/manqbat" className="px-5 py-1 hover:bg-slate-100">
              Manqbat
            </Link>
            <Link
              href="/durood-o-salam"
              className="px-5 py-1 hover:bg-slate-100"
            >
              Durood o Salam
            </Link>
          </PopoverPanel>
        </Popover>
      </div>
    </nav>
  );
}

export default Navbar;
