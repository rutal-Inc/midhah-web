import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = pathname === "/login";

  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isPublicRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Matches all paths except internal API calls and static assets
    `/((?!api|_next/static|_next/image|images|icons|favicon.ico|.*\\..*).*)`,
  ],
};
