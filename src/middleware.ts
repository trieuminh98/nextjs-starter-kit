import { KEYS } from "@/types/key";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login"];

export async function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get(KEYS.JWT_TOKEN)?.value;
  if (publicPaths.includes(request.nextUrl.pathname)) {
    if (jwtToken) {
      const homeUrl = new URL("/", request.url);
      return NextResponse.redirect(homeUrl);
    } else {
      return NextResponse.next();
    }
  }

  // Auth check
  if (!jwtToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API, static, image, favicon, sitemap, robots
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
