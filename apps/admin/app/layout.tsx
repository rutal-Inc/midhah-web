import AuthProvider from "@/components/providers/AuthProvider";
import QueryClientProvider from "@/components/providers/QueryClientProvider";
import { montserrat } from "@midhah/utils/fonts";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "./globals.css";

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
      <body className="flex min-h-full flex-col">
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
