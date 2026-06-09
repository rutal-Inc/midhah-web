import { cache } from "react";

export type Poet = {
  id: number;
  name: string;
};

export const fetchPoet = cache(async (slug: string): Promise<Poet | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/poets/${slug}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) return null;

    const json = await res.json();

    return json.data ?? null;
  } catch (error) {
    console.error("Poet Fetch error:", error);
    return null;
  }
});
