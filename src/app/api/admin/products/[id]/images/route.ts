import { requireApi } from '@/lib/auth/server';
import { catalogRoles } from '@/lib/catalog/validation.mjs';
import { catalogError, catalogResponse, jsonBody } from '@/lib/catalog/http';
import { uploadImage, editImages } from '@/lib/catalog/images';
type Context = { params: Promise<{ id: string }> };
export async function POST(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.write); const { id } = await context.params; return catalogResponse(await uploadImage(request, session.user.id, id), 201); } catch (e) { return catalogError(e); }
}
export async function PATCH(request: Request, context: Context) {
  try { const session = await requireApi(request, catalogRoles.write); const { id } = await context.params; return catalogResponse(await editImages(session.user.id, id, await jsonBody(request))); } catch (e) { return catalogError(e); }
}
