import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import { Metadata } from "next";
import { Noto_Nastaliq_Urdu } from "next/font/google";
import { WEB_BASE_URL } from "../utilities/constants";
import "./globals.css";

const noto_urdu = Noto_Nastaliq_Urdu({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
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
      <body className={noto_urdu.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
