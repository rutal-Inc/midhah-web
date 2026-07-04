"use client";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Suspense, useState } from "react";

export default function ProtectedLayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarCollapse, setIsSidebarCollapse] = useState<boolean>(false);

  const handleSidebarCollapse = () => {
    setIsSidebarCollapse((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-row">
      <div
        className={`${
          isSidebarCollapse ? "w-20" : "w-60"
        } bg-dark-purple shrink-0 text-white transition-all duration-300`}
      >
        <Sidebar
          isCollapse={isSidebarCollapse}
          onCollapseToggle={handleSidebarCollapse}
        />
      </div>

      <div className="relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto px-4 md:px-[1.1rem] 2xl:px-4">
        <Navbar />
        <main>
          <Suspense fallback={<Loader />}>
            <div className="mx-auto max-w-full">{children}</div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
