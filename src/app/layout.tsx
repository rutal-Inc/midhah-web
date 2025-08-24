import loader from "@/src/animations/success2.json";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { Metadata } from "next";
import { Suspense } from "react";
import Loader from "../components/Loader";
import AdSense from "../components/scripts/AdSense";
import GoogleAnalytics from "../components/scripts/GoogleAnalytics";
import NeworMedia from "../components/scripts/NeworMedia";
import TadaLottie from "../components/TadaLottie";
import { WEB_BASE_URL } from "../utilities/constants";
import { montserrat } from "./fonts";
import "./globals.css";

const title = "Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform";
const description =
  "Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(WEB_BASE_URL),
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Midhah Lyrics",
  },
  twitter: {
    title,
    description,
    creator: "@midhahOfficial",
  },
  manifest: "/app.webmanifest",
  creator: "Rutal, Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let datebetween: boolean = false;
  if (
    new Date() >= new Date("2025-08-24") &&
    new Date() <= new Date("2025-09-22")
  ) {
    datebetween = true;
  }

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <GoogleAnalytics
          GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID as string}
        />
        <AdSense />
        <NeworMedia />
        {datebetween && (
          <>
            <TadaLottie loader={loader}  />
            <TadaLottie loader={loader} delay={1500} />
          </>
        )}
        <Suspense fallback={<Loader />}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
