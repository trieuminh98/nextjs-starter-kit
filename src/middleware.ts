import { KEYS } from "@/types/key";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = ["/login"];

const imageExtensions = [
  ".svg",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".ico",
];

// Cache control function
function cacheControl(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;
  // Cache static asset
  if (imageExtensions.some((ext) => pathname.endsWith(ext))) {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=600, stale-while-revalidate=60"
    );
    return response;
  }
  // Cache special pages
  if (pathname === "/about" || pathname.startsWith("/blog/")) {
    const response = NextResponse.next();
    response.headers.set(
      "Cache-Control",
      "public, max-age=600, stale-while-revalidate=60"
    );
    return response;
  }
  return null;
}

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

  // Cache control
  const cache = cacheControl(request);
  if (cache) return cache;

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API, static, image, favicon, sitemap, robots
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
