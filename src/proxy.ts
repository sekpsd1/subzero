import { NextRequest, NextResponse } from 'next/server';
import { apiError, AuthError, checkOrigin, cookieName, sessionForToken, siteOrigin } from '@/lib/auth/server';
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const responseHeaders = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'same-origin' };
  try {
    if (path === '/admin/setup' || path === '/api/admin/setup') return new NextResponse('Not found', { status: 404, headers: responseHeaders });
    if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) checkOrigin(request);
    if (!['/admin/login', '/api/admin/login', '/api/admin/logout'].includes(path)) {
      const session = await sessionForToken(request.cookies.get(cookieName())?.value);
      if (!session) {
        if (path.startsWith('/api/')) throw new AuthError(401, 'Authentication required.');
        return NextResponse.redirect(new URL('/admin/login', siteOrigin()), { headers: responseHeaders });
      }
      if (!['ADMIN', 'STAFF'].includes(session.user.role)) throw new AuthError(403, 'Permission denied.');
    }
    return NextResponse.next({ headers: responseHeaders });
  } catch (error) { return apiError(error); }
}
export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
