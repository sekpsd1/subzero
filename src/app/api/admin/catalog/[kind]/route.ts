import { requireApi } from '@/lib/auth/server';
import { CatalogError, catalogRoles } from '@/lib/catalog/validation.mjs';
import { catalogError, catalogResponse, jsonBody } from '@/lib/catalog/http';
import { catalogOptions, saveTaxonomy, deleteTaxonomy } from '@/lib/catalog/service';
type Context = { params: Promise<{ kind: string }> };
async function kindFor(context: Context) { const { kind } = await context.params; if (kind !== 'brands' && kind !== 'categories') throw new CatalogError(404, 'Unknown catalog type.'); return kind; }
export async function GET(request: Request, context: Context) {
  try { await requireApi(request, catalogRoles.read); const kind = await kindFor(context); return catalogResponse((await catalogOptions())[kind]); } catch (e) { return catalogError(e); }
}
export async function POST(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.write); const kind = await kindFor(context); return catalogResponse(await saveTaxonomy(session.user.id, kind, await jsonBody(request)), 201); } catch (e) { return catalogError(e); }
}
export async function PATCH(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.write); const kind = await kindFor(context); const body = await jsonBody(request); if (typeof body.id !== 'string' || !body.id) throw new CatalogError(422, 'Record ID required.'); return catalogResponse(await saveTaxonomy(session.user.id, kind, body, body.id)); } catch (e) { return catalogError(e); }
}
export async function DELETE(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.delete); const kind = await kindFor(context); const body = await jsonBody(request); if (typeof body.id !== 'string' || !body.id) throw new CatalogError(422, 'Record ID required.'); return catalogResponse(await deleteTaxonomy(session.user.id, kind, body.id)); } catch (e) { return catalogError(e); }
}
