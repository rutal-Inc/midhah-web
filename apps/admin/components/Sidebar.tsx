"use client";

import { auth } from "@midhah/utils/firebase";
import { useAuthStore } from "@midhah/utils/useAuthStore";
import { useUserStore } from "@midhah/utils/useUserStore";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SidebarLinks } from "../constants";

interface SidebarProps {
  isCollapse: boolean;
  onCollapseToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapse, onCollapseToggle }) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUserStore();
  const { logout } = useAuthStore();

  if (!user) redirect("/login");

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      logout();
      globalThis.location.href = "/login";
    } catch (error) {
      toast.error(`Logout failed: ${error}`);
    }
  };

  return (
    <div className="text-foreground border-background-active bg-background text-text fixed flex h-full flex-col justify-between border-2 py-3">
      <div
        className={`relative flex h-screen flex-col ${
          isCollapse ? "w-20" : "w-60"
        } duration-300`}
      >
        <button
          type="button"
          onClick={onCollapseToggle}
          className={`absolute top-6 w-13 cursor-pointer rounded-full ${
            isCollapse ? "-right-2.5 rotate-180" : "-right-10"
          }`}
        >
          <Image
            width={24}
            height={24}
            src={"/assets/collapse.svg"}
            alt="collapse sidebar icon"
          />
        </button>

        <div className="flex w-full items-center justify-center">
          <Image
            alt="Midhah logo"
            width={48}
            height={48}
            src={
              isCollapse
                ? "/assets/midhah-square-logo.svg"
                : "/assets/midhah-lyrics-logo.svg"
            }
            className={`cursor-pointer transition-all duration-400 ${
              isCollapse ? "h-12 w-12" : "h-20 w-auto"
            }`}
          />
        </div>

        <div className="custom-scrollbar flex max-h-[calc(100vh-120px)] flex-col overflow-y-auto pt-2">
          <ul className="mx-3 flex flex-col">
            {SidebarLinks.map((link) => {
              const isActive = pathname.includes(link.link);
              const linkPath = link.link;
              const Linksrc = link.src;

              return (
                <li
                  key={link.id}
                  title={link.title}
                  className={`group bg-background hover:bg-background-hover hover:text-primary my-1 rounded-md ${
                    isActive ? "bg-background-active text-primary" : ""
                  }`}
                >
                  <Link
                    href={linkPath}
                    className={`flex items-center gap-x-2 ${
                      isCollapse ? "w-full justify-center py-4" : "p-4"
                    }`}
                  >
                    <Linksrc
                      fill="text-primary-dark"
                      className="group-hover:text-primary group-hover:fill-current"
                    />
                    {!isCollapse && (
                      <span className="text-sm">{link.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>{" "}
      <div className="relative border-t border-gray-300 p-1">
        <div className="relative flex items-center rounded hover:bg-slate-100">
          <button
            className="flex w-full cursor-pointer items-center justify-center rounded-lg p-2"
            onClick={toggleDropdown}
          >
            {user?.displayPicture && (
              <div className="aspect-square overflow-hidden rounded-full">
                <Image
                  width={40}
                  height={40}
                  src={user.displayPicture}
                  className="h-10 w-10 object-cover"
                  alt={user.name}
                />
              </div>
            )}

            {!isCollapse && (
              <>
                <p className="ml-1 truncate font-bold text-black">
                  {user?.name}
                </p>
                <i
                  className={`bi ${
                    isDropdownOpen ? "bi-chevron-down" : "bi-chevron-up"
                  } ml-auto`}
                ></i>
              </>
            )}
          </button>

          <div
            className={`absolute ${
              isCollapse ? "left-2" : "right-0"
            } -top-14 rounded-lg bg-white shadow-lg ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <button
              onClick={handleSignOut}
              className="hover:bg-lightBlue flex w-full items-center gap-2 px-5 py-3 text-gray-800"
            >
              <i className="bi bi-box-arrow-left text-xl"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
