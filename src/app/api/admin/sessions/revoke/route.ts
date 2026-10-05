import { NextResponse } from 'next/server';
import { getPrisma } from '@/lib/prisma';
import { apiError, requireApi, siteOrigin } from '@/lib/auth/server';
export async function POST(request: Request) {
  try {
    const session = await requireApi(request, ['ADMIN']);
    const db = getPrisma();
    await db.$transaction([
      db.adminSession.updateMany({ where: { revokedAt: null }, data: { revokedAt: new Date() } }),
      db.auditLog.create({ data: { userId: session.user.id, action: 'REVOKE_ALL_SESSIONS', entity: 'AdminSession' } }),
    ]);
    return NextResponse.redirect(new URL('/admin/login?loggedOut=1', siteOrigin()), 303);
  } catch (error) { return apiError(error); }
}
