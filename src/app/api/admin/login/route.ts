import { loginBody } from '@/lib/auth/body';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPrisma } from '@/lib/prisma';
import { AuthError, apiError, checkOrigin, consumeLoginLimit, cookieName, cookieOptions, siteOrigin } from '@/lib/auth/server';
import { digest, randomToken, sessionSeconds, verifyPassword } from '@/lib/auth/crypto.mjs';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    if (!request.headers.get('content-type')?.startsWith('application/x-www-form-urlencoded')) throw new AuthError(415, 'Unsupported form.');
    const text = await loginBody(request);
    if (Buffer.byteLength(text) > 4096) throw new AuthError(400, 'Invalid form.');
    const form = new URLSearchParams(text);
    const email = (form.get('email') || '').trim().toLowerCase();
    const password = form.get('password') || '';
    if (email.length > 191 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || Buffer.byteLength(password) > 256) {
      return NextResponse.redirect(new URL('/admin/login?error=invalid', siteOrigin()), 303);
    }
    await consumeLoginLimit(email);
    const db = getPrisma();
    const candidate = await db.user.findUnique({ where: { email } });
    // MySQL's accent-insensitive collation must not create alternate rate-limit identities.
    const user = candidate?.email.toLowerCase() === email ? candidate : null;
    const valid = await verifyPassword(password, user?.passwordHash || '');
    if (!valid || !user || !['ADMIN', 'STAFF'].includes(user.role)) {
      return NextResponse.redirect(new URL('/admin/login?error=invalid', siteOrigin()), 303);
    }
    const token = randomToken();
    const duration = sessionSeconds(form.get('remember'));
    const expiresAt = new Date(Date.now() + duration * 1000);
    const previous = (await cookies()).get(cookieName())?.value;
    await db.$transaction(async (tx) => {
      if (previous && /^[a-f0-9]{64}$/.test(previous)) await tx.adminSession.updateMany({
        where: { tokenHash: digest(previous), revokedAt: null }, data: { revokedAt: new Date() },
      });
      await tx.adminSession.create({ data: { tokenHash: digest(token), userId: user.id, expiresAt } });
      await tx.auditLog.create({ data: { userId: user.id, action: 'LOGIN', entity: 'AdminSession' } });
    });
    const response = NextResponse.redirect(new URL('/admin', siteOrigin()), 303);
    response.headers.set('Cache-Control', 'no-store');
    response.cookies.set(cookieName(), token, { ...cookieOptions(), expires: expiresAt, maxAge: duration });
    return response;
  } catch (error) {
    if (error instanceof AuthError && error.status === 429) {
      const response = NextResponse.redirect(new URL('/admin/login?error=limited', siteOrigin()), 303);
      response.headers.set('Retry-After', '900');
      return response;
    }
    return apiError(error);
  }
}
