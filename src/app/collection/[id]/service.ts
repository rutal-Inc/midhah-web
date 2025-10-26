import Lyrics from "@/src/models/Lyrics";
type CollectionType = {
  id: string;
  name: string;
  lyrics: Lyrics[];
};

export async function getCollection(
  id: string,
  token: string,
): Promise<CollectionType | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collection/${id}/lyrics`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": `${token}`,
      },
    },
  ).then((response) => response.json());
  console.log(res.data);
  return res.data ? (res.data as CollectionType) : null;
}
