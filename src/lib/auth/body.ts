import { AuthError } from './server';
export async function loginBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new AuthError(400, 'Invalid form.');
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 4096) { await reader.cancel(); throw new AuthError(413, 'Form too large.'); }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}
