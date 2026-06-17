import { SidebarLinks } from "../constants";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const currentLink = SidebarLinks.find((link) =>
    pathname.startsWith(link.link),
  );

  return (
    <nav className="sticky top-0 z-10 bg-white py-2">
      <div className="mx-auto w-full border-b border-gray-300">
        <div className="h-18 flex flex-col items-start justify-between gap-2 py-2 min-[410px]:flex-row min-[410px]:items-center">
          <h1 className="ml-2 text-2xl font-bold text-black">
            {currentLink?.title || "Dashboard"}
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
