"use client";

import { app } from "@/src/utilities/firebase";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Avatar } from "@radix-ui/themes";
import axios from "axios";
import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useUserStore } from "../store/useUserStore";
import Search from "./Search";

function Navbar() {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth | null>(null);
  const { setAuthToken, clearAuthToken } = useAuthStore();
  const { user } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    const authInstance = getAuth(app);
    setAuth(authInstance);
  }, []);

  const handleGoogleLogin = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth!, provider);
    const body = {
      name: result.user.displayName,
      email: result.user.email,
      displayPicture: result.user.photoURL,
      oauthId: result.user.providerData[0]?.uid,
      oauthProvider: result.user.providerData[0]?.providerId,
    };
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login/user`,
      body,
    );
    setAuthToken(response.data.data.token);

    router.push("/");
  };

  const handleSignOut = () => {
    const auth = getAuth(app);

    signOut(auth).then(() => {
      clearAuthToken();
      router.push("/");
    });
  };

  return (
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
            {user ? (
              <Popover className="relative">
                <PopoverButton className="focus-within:outline-0">
                  <Avatar
                    src={user.displayPicture}
                    fallback={user.name.charAt(0)}
                    className="cursor-pointer"
                    size={{ initial: "2", xs: "3" }}
                    radius="full"
                  />
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  className="flex flex-col rounded-sm bg-white shadow-lg [--anchor-gap:4px]"
                >
                  <button
                    onClick={handleSignOut}
                    className="cursor-pointer px-2 py-2 font-medium hover:bg-slate-100 lg:px-5"
                  >
                    Sign Out
                  </button>
                </PopoverPanel>
              </Popover>
            ) : (
              <button
                className="cursor-pointer rounded-sm bg-[#027278] px-2.5 py-1.5 text-white transition hover:opacity-90"
                onClick={handleGoogleLogin}
              >
                {" "}
                Login{" "}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 hidden w-[100%] justify-center gap-2.5 align-middle sm:flex">
        <div className="flex w-[87%] items-center justify-between lg:gap-2 xl:gap-6">
          {/* <Link
          href="/"
          className="rounded-sm px-2 py-1 text-sm font-normal hover:bg-slate-100 lg:px-5 lg:text-base xl:text-lg"
        >
          Home
        </Link> */}
          <Link
            href="/hamd"
            className="rounded-sm px-1 py-1 text-xs font-normal hover:bg-slate-100 md:px-2 md:text-sm lg:px-5 lg:text-base xl:text-lg"
          >
            Hamd e Ta&apos;ala
          </Link>
          <Link
            href="/naat"
            className="rounded-sm px-1 py-1 text-xs font-normal hover:bg-slate-100 md:px-2 md:text-sm lg:px-5 lg:text-base xl:text-lg"
          >
            Naat e Rasool
          </Link>
          <Link
            href="/manqbat"
            className="rounded-sm px-1 py-1 text-xs font-normal hover:bg-slate-100 md:px-2 md:text-sm lg:px-5 lg:text-base xl:text-lg"
          >
            Manqbat
          </Link>
          <Link
            href="/durood-o-salam"
            className="rounded-sm px-1 py-1 text-xs font-normal hover:bg-slate-100 md:px-2 md:text-sm lg:px-5 lg:text-base xl:text-lg"
          >
            Durood o Salam
          </Link>
          <Link
            href="/trending"
            className="rounded-sm px-1 py-1 text-xs font-normal hover:bg-slate-100 md:px-2 md:text-sm lg:px-5 lg:text-base xl:text-lg"
          >
            Trending
          </Link>
          <Link
            href="/staff-picks"
            className="rounded-sm px-1 py-1 text-xs font-normal hover:bg-slate-100 md:px-2 md:text-sm lg:px-5 lg:text-base xl:text-lg"
          >
            Staff Picks
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
