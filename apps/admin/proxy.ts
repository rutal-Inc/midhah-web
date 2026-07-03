import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = pathname === "/login";

  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicRoute) {
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
