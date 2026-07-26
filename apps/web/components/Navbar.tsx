"use client";

import lyricsLogo from "@midhah/assets/brand/lyrics-logo.svg";
import { auth } from "@midhah/utils/firebase";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import * as Popover from "@radix-ui/react-popover";
import { signOut } from "firebase/auth";
import { Library, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { useCollectionStore } from "../store/useCollectionStore";
import CollectionDialog from "./CollectionDialog";
import LoginDialog from "./LoginDialog";
import Search from "./Search";

function Navbar() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);
  const { accessToken, logout, isInitialized } = useAuthStore();
  const { user, setUser } = useUserStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { reset } = useCollectionStore();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      logout();
      setUser(null);
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
              src={lyricsLogo}
              alt="Midhah Lyrics Logo"
              width={150}
              height={70}
            />
          </Link>

          <div
            className={`flex ${showSearch ? "w-full justify-center" : "w-[70%] pl-8 max-[520px]:justify-end sm:pl-2"} items-center justify-between gap-3`}
          >
            <Suspense fallback={null}>
              <Search showSearch={showSearch} setShowSearch={setShowSearch} />
            </Suspense>

            <div
              className={`${showSearch ? "max-[520px]:hidden" : "max-[520px]:block"} flex gap-3`}
            >
              <div className={`hidden items-center justify-center sm:flex`}>
                <ActiveLink href="/trending">Trending</ActiveLink>
                <ActiveLink href="/staff-picks" otherClasses="text-nowrap">
                  Staff Picks
                </ActiveLink>
              </div>
              {accessToken && user ? (
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <button
                      className={`align-middle focus-within:outline-0 ${!isInitialized && "cursor-not-allowed opacity-70"}`}
                      title={`${user.name}`}
                      disabled={!isInitialized}
                    >
                      <Image
                        src={user.displayPicture}
                        alt={user.name.charAt(0).toUpperCase()}
                        className="h-10 min-w-10 cursor-pointer rounded-full object-cover"
                        width={40}
                        height={40}
                      />
                    </button>
                  </Popover.Trigger>
                  <Popover.Portal>
                    <Popover.Content
                      align="end"
                      sideOffset={4}
                      className="z-50 flex flex-col rounded-sm bg-white px-1 py-2 shadow-lg"
                    >
                      <button
                        className="flex cursor-pointer items-start gap-2 px-2 py-2 font-medium hover:bg-slate-100 lg:px-3"
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        <Library className="h-5 w-5" />
                        <p className="flex-1 text-start">Collections</p>
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="flex cursor-pointer items-start gap-2 px-2 py-2 font-medium hover:bg-slate-100 lg:px-3"
                      >
                        <LogOut className="h-5 w-5" />
                        <p className="flex-1 text-start">Sign Out</p>
                      </button>
                    </Popover.Content>
                  </Popover.Portal>
                </Popover.Root>
              ) : (
                <button
                  className={`btn-secondary cursor-pointer rounded-sm px-2.5 py-1.5 text-white ${!isInitialized && "cursor-not-allowed opacity-70"}`}
                  onClick={() => {
                    setIsLoginDialogOpen(true);
                  }}
                  disabled={!isInitialized}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="mt-2 hidden w-full justify-center gap-2.5 align-middle sm:flex">
          <div className="flex w-[87%] items-center justify-between lg:w-3xl lg:gap-2 xl:gap-6">
            <ActiveLink href="/hamd">Hamd e Ta&apos;ala</ActiveLink>
            <ActiveLink href="/naat">Naat e Rasool</ActiveLink>
            <ActiveLink href="/manqbat">Manqbat</ActiveLink>
            <ActiveLink href="/durood-o-salam">Durood o Salam</ActiveLink>
          </div>
        </div>
      </nav>
      <CollectionDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        collectionType="all"
      />
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
  otherClasses?: string;
}

function ActiveLink({
  href,
  children,
  activeClassName = "bg-slate-100",
  inactiveClassName = "hover:bg-slate-100",
  otherClasses,
}: Readonly<ActiveLinkProps>) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={`rounded-sm px-2 py-1 text-sm font-normal transition-colors duration-200 md:px-3 md:text-base lg:px-5 lg:text-lg ${
        isActive ? activeClassName : inactiveClassName
      } ${otherClasses}`}
    >
      {children}
    </Link>
  );
}
export default Navbar;
