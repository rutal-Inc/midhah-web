import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/src/components/providers/AuthProvider";
import QueryClientProvider from "@/src/components/providers/QueryClientProvider";
import NextTopLoader from "nextjs-toploader";
import { montserrat } from "@midhah/utils/fonts";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Login | Midhah Lyrics",
  description: "Admin Panel",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <NextTopLoader
          color="#256279"
          height={4}
          showSpinner={false}
          shadow="0 0 20px #000000"
        />
        <QueryClientProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
