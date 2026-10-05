import { requireApi } from '@/lib/auth/server';
import { catalogRoles } from '@/lib/catalog/validation.mjs';
import { catalogError, catalogResponse, jsonBody } from '@/lib/catalog/http';
import { productLifecycle } from '@/lib/catalog/service';
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try { const session = await requireApi(request, catalogRoles.restore); const { id } = await context.params; return catalogResponse(await productLifecycle(session.user.id, id, await jsonBody(request), true)); } catch (e) { return catalogError(e); }
}
