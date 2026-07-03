import type { Metadata } from "next";
import ProtectedLayoutClient from "./ProtectedLayoutClient";

export const metadata: Metadata = {
  title: "Admin Panel | Midhah Lyrics",
  description: "Secure dashboard",
};

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ProtectedLayoutClient>{children}</ProtectedLayoutClient>;
}
