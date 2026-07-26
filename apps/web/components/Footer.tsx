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
import { promoLines } from "../utilities/constants";
import GooglePlayBadge from "./GooglePlayBadge";

function Footer() {
  const today = new Date();
  const year = today.getFullYear();
  const [selectedPromo] = useState(
    () => promoLines[Math.floor(Math.random() * promoLines.length)],
  );

  return (
    <div>
      <div className="mx-auto w-[90%] border-t-2 py-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <h3 className="text-lg text-gray-500">{selectedPromo}</h3>

          <GooglePlayBadge location="footer" />

          <ul className="mt-2 flex justify-center gap-12">
            <li>
              <a
                aria-label="Follow us on Facebook"
                className="text-gray-500"
                href="https://www.facebook.com/midhah.official"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookLogo className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                aria-label="Follow us on Twitter"
                className="text-gray-500"
                href="https://x.com/midhahOfficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <XLogo className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                aria-label="Follow us on Instagram"
                className="text-gray-500"
                href="https://www.instagram.com/midhah.official/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramLogo className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a
                aria-label="Checkout our source code"
                className="text-gray-500"
                href="https://github.com/rutal-Inc/midhah-web"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo className="h-6 w-6" />
              </a>
            </li>
          </ul>
        </div>

        <hr className="my-8 border-gray-300" />

        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Image
              src={logoGrey}
              alt="midhah-logo-grey"
              width={30}
              height={30}
              className="mr-1"
            />
            <span className="text-gray-500">
              &copy; {year} Midhah{" "}
              <span className="hidden md:inline-block">
                Lyrics. All rights reserved
              </span>
            </span>
          </div>

          <div className="flex space-x-5">
            <Link href="/privacy-policy" className="text-gray-500">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
