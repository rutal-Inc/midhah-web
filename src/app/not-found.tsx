import Link from "next/link";

export default function NotFound() {
  return (
    <div className="my-32 text-center">
      <h2>Not Found</h2>
      <i className="bi bi-emoji-dizzy my-5 text-7xl"></i>
      <p className="mb-5">Could not find requested resource</p>

      <Link href="/" className="my-5 py-2 px-4 hover:bg-gray-50">
        Go to Home
      </Link>
    </div>
  );
}
