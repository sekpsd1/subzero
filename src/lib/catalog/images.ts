import 'server-only';
import sharp from 'sharp';
import path from 'node:path';
import { mkdir, writeFile, unlink, readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { getPrisma } from '@/lib/prisma';
import { audit, lockProduct } from './service';
import { CatalogError, text, imageEdits } from './validation.mjs';
import { boundedBody } from './http';

export function mediaRoot() {
  const root = path.resolve(/* turbopackIgnore: true */ process.env.PRODUCT_MEDIA_DIR || path.join(process.cwd(), '.product-media'));
  const publicRoot = path.resolve(process.cwd(), 'public');
  if (root === publicRoot || root.startsWith(publicRoot + path.sep)) throw new Error('Private media storage required.');
  return root;
}
export async function uploadImage(request: Request, userId: string, productId: string) {
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) throw new CatalogError(415, 'Multipart upload required.');
  const body = await boundedBody(request, 6 * 1024 * 1024);
  let form: FormData;
  try { form = await new Request('http://localhost', { method: 'POST', headers: { 'content-type': request.headers.get('content-type')! }, body: new Uint8Array(body) }).formData(); }
  catch { throw new CatalogError(400, 'Invalid upload.'); }
  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0 || file.size > 5 * 1024 * 1024) throw new CatalogError(422, 'Choose one image, maximum 5 MiB.');
  const formats: Record<string, string> = { 'image/jpeg': 'jpeg', 'image/png': 'png', 'image/webp': 'webp' };
  if (!formats[file.type]) throw new CatalogError(415, 'Only JPEG, PNG and WebP are supported.');
  const bytes = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  try {
    const image = sharp(bytes, { limitInputPixels: 24_000_000, failOn: 'warning', animated: true });
    const meta = await image.metadata();
    if (meta.format !== formats[file.type] || !meta.width || !meta.height || meta.width > 8000 || meta.height > 8000 || (meta.pages || 1) > 1) throw new Error('Invalid image');
    // Full decode/re-encode removes metadata, appended payloads and original filenames.
    output = await image.rotate().webp({ quality: 90 }).toBuffer();
  } catch { throw new CatalogError(422, 'Image is invalid, animated, too large, or does not match its declared type.'); }
  const alt = text(form.get('alt'), 'alt', 500);
  const id = randomUUID(); const url = `/api/product-images/${id}`;
  const root = mediaRoot(); await mkdir(root, { recursive: true, mode: 0o700 });
  const filename = path.join(root, `${id}.webp`);
  await writeFile(filename, output, { flag: 'wx', mode: 0o600 });
  try {
    return await getPrisma().$transaction(async tx => {
      const product = await lockProduct(tx, productId, form.get('updatedAt') ?? null);
      if (product.images.length >= 20) throw new CatalogError(422, 'Maximum 20 images per product.');
      await tx.productImage.create({ data: { id, productId, url, alt, sortOrder: product.images.length } });
      await tx.product.update({ where: { id: productId }, data: { updatedAt: new Date(Math.max(Date.now(), product.updatedAt.getTime() + 1)) } });
      await audit(tx, userId, 'UPLOAD_IMAGE', 'ProductImage', id);
      return { id };
    });
  } catch (error) { await unlink(filename).catch(() => {}); throw error; }
}
export async function editImages(userId: string, productId: string, input: { updatedAt?: string; images?: unknown; deleteId?: unknown }) {
  return getPrisma().$transaction(async tx => {
    const product = await lockProduct(tx, productId, input.updatedAt ?? null);
    if (input.deleteId !== undefined) {
      const id = text(input.deleteId, 'imageId', 191, true)!;
      if (!product.images.some(i => i.id === id)) throw new CatalogError(404, 'Image not found on this product.');
      await tx.productImage.delete({ where: { id } });
      // Keep physical bytes private for backup recovery; no route can serve an unlinked file.
      await audit(tx, userId, 'DELETE_IMAGE', 'ProductImage', id);
    } else {
      const edits = imageEdits(input.images, product.images.map(i => i.id));
      for (const edit of edits) await tx.productImage.update({ where: { id: edit.id }, data: { alt: edit.alt, sortOrder: edit.sortOrder } });
      await audit(tx, userId, 'SORT_ALT_IMAGES', 'Product', productId);
    }
    await tx.product.update({ where: { id: productId }, data: { updatedAt: new Date(Math.max(Date.now(), product.updatedAt.getTime() + 1)) } });
    return { id: productId };
  });
}
export async function readManagedImage(id: string) {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new CatalogError(404, 'Image not found.');
  try { return await readFile(/* turbopackIgnore: true */ path.join(mediaRoot(), `${id}.webp`)); } catch { throw new CatalogError(404, 'Image not found.'); }
}
