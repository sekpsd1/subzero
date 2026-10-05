import { NextResponse } from 'next/server';
import { apiError, requireApi } from '@/lib/auth/server';
export async function GET(request: Request) {
  try {
    const session = await requireApi(request);
    return NextResponse.json({ user: session.user, expiresAt: session.expiresAt }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) { return apiError(error); }
}
