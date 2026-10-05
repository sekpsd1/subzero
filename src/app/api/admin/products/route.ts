import { requireApi } from '@/lib/auth/server';
import { catalogRoles } from '@/lib/catalog/validation.mjs';
import { catalogError, catalogResponse, jsonBody } from '@/lib/catalog/http';
import { listProducts, saveProduct } from '@/lib/catalog/service';
export async function GET(request: Request) {
  try { await requireApi(request, catalogRoles.read); return catalogResponse(await listProducts(new URL(request.url).searchParams)); } catch (e) { return catalogError(e); }
}
export async function POST(request: Request) {
  try { const session = await requireApi(request, catalogRoles.write); return catalogResponse(await saveProduct(session.user.id, await jsonBody(request)), 201); } catch (e) { return catalogError(e); }
}
