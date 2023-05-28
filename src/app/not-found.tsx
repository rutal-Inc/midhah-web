import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-32 text-center">
      <h2>Not Found</h2>
      <i className="bi bi-emoji-dizzy text-7xl my-5"></i>
      <p className="mb-5">Could not find requested resource</p>

      <Link href="/" className="hover:bg-gray-50 py-2 px-4 my-5">
        Go to Home
      </Link>
    </div>
  );
}
