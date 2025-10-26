"use client";

import Loader from "@/src/components/Loader";
import LyricCard from "@/src/components/LyricCard";
import Lyrics from "@/src/models/Lyrics";
import { useAuthStore } from "@/src/store/useAuthStore";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCollection } from "./service";
type CollectionType = {
  id: string;
  name: string;
  lyrics: Lyrics[];
};

export default function CollectionPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const { id } = React.use(params);
  const token = useAuthStore((state) => state.authToken);
  const [collection, setCollection] = useState<CollectionType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCollection = async () => {
      if (!token) {
        router.push("/");
        return;
      }
      setLoading(true);
      const data = await getCollection(id, token);
      setCollection(data);
      setLoading(false);
    };
    fetchCollection();
  }, [id, token, router]);

  if (!token) {
    router.push("/");
  }
  if (loading) {
    return <Loader />;
  }

  if (!collection) {
    notFound();
  }

  return (
    <div className="container mx-auto w-full md:w-[85%]">
      <div className="hero-bg card relative mb-5 overflow-hidden md:rounded-[10px]">
        <div className="py-[60px] text-center md:py-[150px]">
          <h1 className="mb-1 text-2xl text-white md:text-5xl">
            {collection.name}
          </h1>
        </div>
      </div>

      <main className="flex min-h-[calc(100vh-575px)] flex-col items-center justify-center">
        {collection.lyrics.length > 0 ? (
          <ul className="w-full md:grid md:grid-cols-2">
            {collection.lyrics.map((lyric: Lyrics, index: number) => (
              <LyricCard
                key={lyric.slug + index}
                title={lyric.title}
                genre={lyric.genre}
                slug={lyric.slug}
                preview={lyric.preview}
                poet={lyric.poet?.name}
              />
            ))}
          </ul>
        ) : (
          <div className="text-2xl">No Lyrics Added Yet</div>
        )}
      </main>
    </div>
  );
}
