import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  const secret = req.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return Response.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 },
    );
  }
  const { slug } = await req.json();

  if (!slug) {
    return Response.json(
      { revalidated: false, error: "Slug is required" },
      { status: 400 },
    );
  }

  revalidateTag(`lyrics-${slug}`);

  return Response.json({ revalidated: true, slug });
}
