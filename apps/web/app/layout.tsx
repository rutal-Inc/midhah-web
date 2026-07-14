import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Settings } from "@/components/Settings";
import { montserrat } from "@midhah/utils/fonts";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Metadata } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import AdBanner from "../components/AdBanner";
import ClientWrapper from "../components/ClientWrapper";
import AuthProvider from "../components/providers/AuthProvider";
import GoogleAnalytics from "../components/scripts/GoogleAnalytics";
import { WEB_BASE_URL } from "../utilities/constants";
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
  const { NEXT_PUBLIC_GA_TRACKING_ID } = process.env;

  return (
    <html lang="en">
      <Script
        async
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9810490020982461"
        strategy="beforeInteractive"
      />
      <body className={montserrat.className}>
        <NextTopLoader
          color="#256279"
          height={4}
          showSpinner={false}
          shadow="0 0 20px #000000"
        />
        <AuthProvider>
          {NEXT_PUBLIC_GA_TRACKING_ID && (
            <GoogleAnalytics GA_TRACKING_ID={NEXT_PUBLIC_GA_TRACKING_ID} />
          )}
          <Theme>
            <ClientWrapper />
            <AdBanner />
            <Navbar />
            {children}
            <Footer />
            <Settings />
          </Theme>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
