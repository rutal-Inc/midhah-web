import { Frown } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-32 text-center">
      <h2>Not Found</h2>
      <Frown className="mx-auto my-5 h-20 w-20" />
      <p className="mb-5">Could not find requested resource</p>

      <Link href="/" className="my-5 px-4 py-2 hover:bg-gray-50">
        Go to Home
      </Link>
    </div>
  );
}
