import 'server-only';
import { NextResponse } from 'next/server';
import { AuthError } from '@/lib/auth/server';
import { CatalogError, object } from './validation.mjs';

export async function boundedBody(request: Request, max: number) {
  const reader = request.body?.getReader();
  if (!reader) throw new CatalogError(400, 'Request body required.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > max) { await reader.cancel(); throw new CatalogError(413, 'Request is too large.'); }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
export async function jsonBody(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new CatalogError(415, 'JSON required.');
  const body = await boundedBody(request, 256 * 1024);
  try { return object(JSON.parse(body.toString('utf8'))); } catch { throw new CatalogError(400, 'Invalid JSON.'); }
}
export function catalogResponse(data: unknown, status = 200) {
  return NextResponse.json({ data }, { status, headers: { 'Cache-Control': 'no-store' } });
}
export function catalogError(error: unknown) {
  if (error instanceof AuthError || error instanceof CatalogError) return NextResponse.json({ error: error.message, fields: error instanceof CatalogError ? error.fields : {} }, { status: error.status, headers: { 'Cache-Control': 'no-store' } });
  const code = (error as { code?: string })?.code;
  const status = ['P2002', 'P2003', 'P2034'].includes(code || '') ? 409 : code === 'P2025' ? 404 : 503;
  const errorText = code === 'P2002' ? 'Model or slug already exists (including deleted records).' : code === 'P2003' ? 'This record is in use or a related record changed.' : code === 'P2034' ? 'Another editor changed the catalog. Reload and try again.' : code === 'P2025' ? 'Record not found.' : 'Catalog service unavailable. Please try again.';
  return NextResponse.json({ error: errorText }, { status, headers: { 'Cache-Control': 'no-store' } });
}
