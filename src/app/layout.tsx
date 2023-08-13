import Navbar from "@/src/components/Navbar";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Footer from "@/src/components/Footer";
import { Metadata } from "next";

const montserrat = Montserrat({ subsets: ["latin"] });

const title = "Midhah - Hamd, Naat, Manqbat and Durood o Salam lyrics platform";
const description =
  "Midhah مدحة is a leading & the most authentic lyrics searching platform for Hamd, Nasheed/Naat, Manqbat, and Durood o Salam. Download the app from Google Play Store.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    type: "website",
    siteName: "Midhah Lyrics",
  },
  twitter: {
    creator: "@midhahOfficial",
  },
  manifest: "app.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={montserrat.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
