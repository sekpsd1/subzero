import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { digest, roleAllowed, sessionActive } from './crypto.mjs';
import type { UserRole } from '@prisma/client';

export function siteOrigin() {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  if (process.env.NODE_ENV === 'production' && url.protocol !== 'https:') throw new Error('HTTPS site URL required.');
  return url.origin;
}
export function cookieName() { return siteOrigin().startsWith('https:') ? '__Host-sz-admin' : 'sz-admin'; }
export function cookieOptions() {
  return { httpOnly: true, secure: siteOrigin().startsWith('https:'), sameSite: 'lax' as const, path: '/' };
}
export class AuthError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function checkOrigin(request: Request) {
  if (request.headers.get('origin') !== siteOrigin() || request.headers.get('sec-fetch-site') === 'cross-site') {
    throw new AuthError(403, 'Request origin rejected.');
  }
}
export async function currentSession() {
  return sessionForToken((await cookies()).get(cookieName())?.value);
}
export async function sessionForToken(token: string | undefined) {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const session = await getPrisma().adminSession.findUnique({
    where: { tokenHash: digest(token) },
    include: { user: { select: { id: true, name: true, email: true, role: true } } },
  });
  return sessionActive(session) ? session : null;
}
export async function requirePage(roles: UserRole[] = ['ADMIN', 'STAFF']) {
  const session = await currentSession();
  if (!session) redirect('/admin/login');
  if (!roleAllowed(session.user.role, roles)) redirect('/admin?error=forbidden');
  return session;
}
export async function requireApi(request: Request, roles: UserRole[] = ['ADMIN', 'STAFF']) {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) checkOrigin(request);
  const session = await currentSession();
  if (!session) throw new AuthError(401, 'Authentication required.');
  if (!roleAllowed(session.user.role, roles)) throw new AuthError(403, 'Permission denied.');
  return session;
}
export function apiError(error: unknown) {
  return NextResponse.json({ error: error instanceof AuthError ? error.message : 'Authentication service unavailable.' },
    { status: error instanceof AuthError ? error.status : 503, headers: { 'Cache-Control': 'no-store' } });
}
export async function consumeLoginLimit(email: string) {
  const db = getPrisma();
  await db.authRateLimit.deleteMany({ where: { expiresAt: { lte: new Date() } } });
  for (const [scope, seconds, limit] of [['global', 60, 60], [`account:${email}`, 900, 5]] as const) {
    const key = digest(`login:${scope}`);
    const attempts = await db.$transaction(async (tx) => {
      await tx.$executeRaw`INSERT INTO AuthRateLimit (\`key\`, attempts, expiresAt)
        VALUES (${key}, 1, DATE_ADD(NOW(3), INTERVAL ${seconds} SECOND))
        ON DUPLICATE KEY UPDATE attempts = IF(expiresAt <= NOW(3), 1, attempts + 1),
        expiresAt = IF(expiresAt <= NOW(3), DATE_ADD(NOW(3), INTERVAL ${seconds} SECOND), expiresAt)`;
      return (await tx.authRateLimit.findUniqueOrThrow({ where: { key } })).attempts;
    });
    if (attempts > limit) throw new AuthError(429, 'Too many attempts. Please try again later.');
  }
}
