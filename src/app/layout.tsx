import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { Metadata } from "next";
import { Suspense } from "react";
import GoogleAnalytics from "../components/GoogleAnalytics";
import Loader from "../components/Loader";
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
  creator: "rutal, Inc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics
        GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_TRACKING_ID as string}
      />
      <body className={montserrat.className}>
        <Suspense fallback={<Loader />}>
          <Navbar />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
