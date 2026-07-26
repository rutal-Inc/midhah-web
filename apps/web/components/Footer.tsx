"use client";

import {
  FacebookLogo,
  GithubLogo,
  InstagramLogo,
  XLogo,
} from "@/components/icons/social";
import logoGrey from "@midhah/assets/brand/logo-grey.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { genresInfo, promoLines } from "../utilities/constants";
import GooglePlayBadge from "./GooglePlayBadge";

const exploreLinks = [
  { title: "Trending", href: "/trending" },
  { title: "Staff Picks", href: "/staff-picks" },
  { title: "Search", href: "/search" },
  { title: "Privacy Policy", href: "/privacy-policy" },
];

const socialLinks = [
  {
    label: "Follow us on Facebook",
    href: "https://www.facebook.com/midhah.official",
    Icon: FacebookLogo,
  },
  {
    label: "Follow us on Twitter",
    href: "https://x.com/midhahOfficial",
    Icon: XLogo,
  },
  {
    label: "Follow us on Instagram",
    href: "https://www.instagram.com/midhah.official/",
    Icon: InstagramLogo,
  },
  {
    label: "Checkout our source code",
    href: "https://github.com/rutal-Inc/midhah-web",
    Icon: GithubLogo,
  },
];

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  const [selectedPromo] = useState(
    () => promoLines[Math.floor(Math.random() * promoLines.length)],
  );

  return (
    <footer className="mt-10 bg-(--midnight-950) text-gray-300">
      <div className="mx-auto w-[90%] py-10 md:w-[85%]">
        {/* App promo */}
        <div className="flex flex-col items-center gap-3 border-b border-white/10 pb-8 text-center">
          <h3 className="text-lg text-gray-300">{selectedPromo}</h3>
          <GooglePlayBadge location="footer" />
        </div>

        {/* Link columns: internal discovery + social */}
        <div className="grid grid-cols-2 gap-8 py-8 text-start md:grid-cols-3">
          <nav aria-label="Genres">
            <h4 className="mb-3 font-semibold text-white">Genres</h4>
            <ul className="space-y-2">
              {genresInfo.map((genre) => (
                <li key={genre.path}>
                  <Link
                    href={`/${genre.path}`}
                    className="text-sm text-gray-400 capitalize hover:text-white"
                  >
                    {genre.title.toLowerCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Explore">
            <h4 className="mb-3 font-semibold text-white">Explore</h4>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-3 font-semibold text-white">Follow Midhah</h4>
            <ul className="flex gap-6">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <a
                    aria-label={label}
                    className="text-gray-400 hover:text-white"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between border-t border-white/10 pt-6">
          <div className="flex items-center">
            <Image
              src={logoGrey}
              alt="midhah-logo-grey"
              width={30}
              height={30}
              className="mr-1"
            />
            <span className="text-sm text-gray-400">
              &copy; {year} Midhah{" "}
              <span className="hidden md:inline-block">
                Lyrics. All rights reserved
              </span>
            </span>
          </div>
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-400 hover:text-white"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
