import { KEYS } from '@/constants/key';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicPrefixes = ['/login'];

export function proxy(request: NextRequest) {
  const t0 = performance.now();

  // only handle navigation (avoid redirect breaking POST/PUT)
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return NextResponse.next();
  }

  const jwtToken = request.cookies.get(KEYS.JWT_TOKEN)?.value;
  const { pathname, search } = request.nextUrl;

  const isPublic = publicPrefixes.some((p) => pathname === p || pathname.startsWith(p + '/'));

  // Public route
  if (isPublic) {
    if (jwtToken) {
      const res = NextResponse.redirect(new URL('/', request.url));
      res.headers.set('Server-Timing', `mw;dur=${(performance.now() - t0).toFixed(1)}`);
      return res;
    }
    const res = NextResponse.next();
    res.headers.set('Server-Timing', `mw;dur=${(performance.now() - t0).toFixed(1)}`);
    return res;
  }

  // Protected routes
  if (!jwtToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname + search);

    const res = NextResponse.redirect(loginUrl);
    res.headers.set('Server-Timing', `mw;dur=${(performance.now() - t0).toFixed(1)}`);
    return res;
  }

  const res = NextResponse.next();
  res.headers.set('Server-Timing', `mw;dur=${(performance.now() - t0).toFixed(1)}`);
  return res;
}

export const config = {
  matcher: [
    // Exclude API, Next internals, common public files, and any path with extension
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
