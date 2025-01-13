import Lyrics from "@/src/models/Lyrics";

export const getLyrics = async (slug: string): Promise<Lyrics | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/lyrics/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  ).then((response) => {
    return response.json();
  });

  return res.data ? (res.data as Lyrics) : null;
};
