import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <header className="flex w-[85%]  items-center justify-center mb-4 mx-auto border-b-2 px-5">
      <Link href="/">
        <Image
          src="/images/midhah-lyrics-logo.svg"
          alt="Midhah Lyrics Logo"
          className="h-[70px] "
        />
      </Link>
    </header>
  );
}

export default Navbar;
