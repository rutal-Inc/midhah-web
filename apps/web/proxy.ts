import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const referer = request.headers.get("referer") ?? "";
  const response = NextResponse.next();

  if (referer) {
    response.cookies.set("referer", referer, {
      path: "/",
      maxAge: 60 * 5,
      sameSite: "lax",
    });
  } else {
    response.cookies.delete("referer");
  }

  return response;
}

export const config = {
  matcher: [
    "/(hamd|naat|manqbat|durood-o-salam)/:slug",
    "/(hamd|naat|manqbat|durood-o-salam)/:slug/transliterated",
    "/poets/:slug",
  ],
};
