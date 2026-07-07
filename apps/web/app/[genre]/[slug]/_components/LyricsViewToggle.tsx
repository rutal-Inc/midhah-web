"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LyricsViewToggle({
  genre,
  slug,
}: Readonly<{
  genre: string;
  slug: string;
}>) {
  const pathname = usePathname();
  const active = pathname.endsWith("/transliterated")
    ? "transliterated"
    : "lyrics";

  const tabs = [
    { key: "lyrics", label: "Urdu Version", href: `/${genre}/${slug}` },
    {
      key: "transliterated",
      label: "Transliterated (Roman English) Version",
      href: `/${genre}/${slug}/transliterated`,
    },
  ] as const;

  return (
    <div className="flex w-full justify-center pt-6">
      {tabs.map((tab, index) => (
        <Link
          key={tab.key}
          href={tab.href}
          prefetch={false}
          scroll={false}
          className={`w-full px-5 py-2 text-center text-sm font-medium transition ${index === 0 ? "md:rounded-l-lg" : "md:rounded-r-lg"} ${
            active === tab.key
              ? "bg-teal-700 text-white"
              : "bg-gray-100 text-teal-700 hover:bg-gray-200"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
