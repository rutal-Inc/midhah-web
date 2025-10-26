"use client";

import { app } from "@/src/utilities/firebase";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { getAuth, signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCollectionStore } from "../store/useCollectionStore";
import { useUserStore } from "../store/useUserStore";
import CollectionDialog from "./CollectionDialog";
import LoginDialog from "./LoginDialog";
import Search from "./Search";

function Navbar() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const { authToken, clearAuthToken } = useAuthStore();
  const { user } = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { reset } = useCollectionStore();
  const handleSignOut = () => {
    const auth = getAuth(app);

    signOut(auth).then(() => {
      clearAuthToken();
      reset();
    });

    router.refresh();
  };

  return (
    <>
      <nav className="relative mx-auto mb-2 w-[90%] flex-col px-3 max-[520px]:py-2 md:w-[96%] md:px-5 lg:w-[94%] xl:w-[88%]">
        <div
          className={`flex items-center ${showSearch ? "justify-center" : "justify-between"} gap-2 border-b-2 max-[520px]:pb-1.5`}
        >
          <Link
            href="/"
            className={`${showSearch ? "max-[520px]:hidden max-[520px]:w-[1%]" : "w-[30%] max-[520px]:block"} block`}
          >
            <Image
              src="/images/midhah-lyrics-logo.svg"
              alt="Midhah Lyrics Logo"
              width={150}
              height={70}
            />
          </Link>

          <div
            className={`flex ${showSearch ? "w-[100%] justify-center" : "w-[70%] pl-8 max-[520px]:justify-end"} items-center justify-between gap-3`}
          >
            <Search showSearch={showSearch} setShowSearch={setShowSearch} />
            <div
              className={`${showSearch ? "max-[520px]:hidden" : "max-[520px]:block"}`}
            >
              {authToken && user ? (
                <Popover className="relative">
                  <PopoverButton
                    className="align-middle focus-within:outline-0"
                    title={`${user.name}`}
                  >
                    <Image
                      src={user.displayPicture}
                      alt={user.name.charAt(0).toUpperCase()}
                      className="h-10 w-10 cursor-pointer rounded-full object-cover"
                      width={500}
                      height={500}
                    />
                  </PopoverButton>
                  <PopoverPanel
                    anchor="bottom"
                    className="flex flex-col rounded-sm bg-white px-1 py-2 shadow-lg [--anchor-gap:4px]"
                  >
                    <button
                      className="flex cursor-pointer items-start gap-2 px-2 py-2 font-medium hover:bg-slate-100 lg:px-3"
                      onClick={() => {
                        setIsOpen(true);
                      }}
                    >
                      <i className="bi bi-collection"></i>
                      <p className="flex-1 text-start">Collections</p>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="flex cursor-pointer items-start gap-2 px-2 py-2 font-medium hover:bg-slate-100 lg:px-3"
                    >
                      <i className="bi bi-box-arrow-left"></i>
                      <p className="flex-1 text-start">Sign Out</p>
                    </button>
                  </PopoverPanel>
                </Popover>
              ) : (
                <button
                  className="cursor-pointer rounded-sm bg-[#027278] px-2.5 py-1.5 text-white transition hover:opacity-90"
                  onClick={() => {
                    setIsLoginDialogOpen(true);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 hidden w-[100%] justify-center gap-2.5 align-middle sm:flex">
          <div className="flex w-[87%] items-center justify-between lg:gap-2 xl:gap-6">
            <ActiveLink href="/hamd">Hamd e Ta&apos;ala</ActiveLink>
            <ActiveLink href="/naat">Naat e Rasool</ActiveLink>
            <ActiveLink href="/manqbat">Manqbat</ActiveLink>
            <ActiveLink href="/durood-o-salam">Durood o Salam</ActiveLink>
            <ActiveLink href="/trending">Trending</ActiveLink>
            <ActiveLink href="/staff-picks">Staff Picks</ActiveLink>
          </div>
        </div>
      </nav>
      <CollectionDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      <LoginDialog
        isOpen={isLoginDialogOpen}
        setIsOpen={setIsLoginDialogOpen}
      />
    </>
  );
}

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
}

function ActiveLink({
  href,
  children,
  activeClassName = "bg-slate-100",
  inactiveClassName = "hover:bg-slate-100",
}: Readonly<ActiveLinkProps>) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-sm px-2 py-1 text-sm font-normal transition-colors duration-200 md:px-3 md:text-base lg:px-5 lg:text-lg ${
        isActive ? activeClassName : inactiveClassName
      }`}
    >
      {children}
    </Link>
  );
}
export default Navbar;
