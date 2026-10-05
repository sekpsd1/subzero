import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPrisma } from '@/lib/prisma';
import { digest } from '@/lib/auth/crypto.mjs';
import { apiError, checkOrigin, cookieName, cookieOptions, siteOrigin } from '@/lib/auth/server';
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    const token = (await cookies()).get(cookieName())?.value;
    if (token && /^[a-f0-9]{64}$/.test(token)) await getPrisma().adminSession.updateMany({
      where: { tokenHash: digest(token), revokedAt: null }, data: { revokedAt: new Date() },
    });
    const response = NextResponse.redirect(new URL('/admin/login?loggedOut=1', siteOrigin()), 303);
    response.cookies.set(cookieName(), '', { ...cookieOptions(), maxAge: 0 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (error) { return apiError(error); }
}
