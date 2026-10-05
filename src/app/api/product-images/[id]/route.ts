import { currentSession } from '@/lib/auth/server';
import { getPrisma } from '@/lib/prisma';
import { readManagedImage } from '@/lib/catalog/images';
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const image = await getPrisma().productImage.findUnique({ where: { id }, select: { url: true, product: { select: { status: true, deletedAt: true } } } });
    if (!image || image.url !== `/api/product-images/${id}`) return new Response(null, { status: 404 });
    if ((image.product.status !== 'ACTIVE' || image.product.deletedAt) && !await currentSession()) return new Response(null, { status: 404, headers: { 'Cache-Control': 'no-store' } });
    return new Response(new Uint8Array(await readManagedImage(id)), { headers: { 'Content-Type': 'image/webp', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'private, no-store', 'Vary': 'Cookie' } });
  } catch { return new Response(null, { status: 404, headers: { 'Cache-Control': 'no-store' } }); }
}
