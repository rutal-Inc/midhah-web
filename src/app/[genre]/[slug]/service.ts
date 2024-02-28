import Lyrics from "@/src/models/Lyrics";

export const getLyrics = async (
  genre: string,
  slug: string
): Promise<Lyrics | null> => {
  const res = await fetch(`https://api.midhah.com/v2/lyrics/${genre}/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });

  return res.data ? (res.data as Lyrics) : null;
};
