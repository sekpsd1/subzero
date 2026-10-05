import { requireApi } from '@/lib/auth/server';
import { getPrisma } from '@/lib/prisma';
import { CatalogError, catalogRoles } from '@/lib/catalog/validation.mjs';
import { catalogError, catalogResponse, jsonBody } from '@/lib/catalog/http';
import { productSelect, saveProduct, productLifecycle } from '@/lib/catalog/service';
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  try { await requireApi(request, catalogRoles.read); const { id } = await context.params; const data = await getPrisma().product.findUnique({ where: { id }, select: productSelect }); if (!data) throw new CatalogError(404, 'Product not found.'); return catalogResponse(data); } catch (e) { return catalogError(e); }
}
export async function PATCH(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.write); const { id } = await context.params; return catalogResponse(await saveProduct(session.user.id, await jsonBody(request), id)); } catch (e) { return catalogError(e); }
}
export async function DELETE(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.delete); const { id } = await context.params; return catalogResponse(await productLifecycle(session.user.id, id, await jsonBody(request), false)); } catch (e) { return catalogError(e); }
}
