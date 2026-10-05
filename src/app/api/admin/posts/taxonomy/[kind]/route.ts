import { requireApi } from "@/lib/auth/server";
import { catalogError, catalogResponse, jsonBody } from "@/lib/catalog/http";
import { taxonomy } from "@/lib/posts/service";
import { CatalogError } from "@/lib/catalog/validation.mjs";
type Context = { params: Promise<{ kind: string }> };
async function handle(r: Request, c: Context, remove = false) {
  try {
    const s = await requireApi(r, remove ? ["ADMIN"] : ["ADMIN", "STAFF"]);
    const { kind } = await c.params;
    if (kind !== "categories" && kind !== "tags")
      throw new CatalogError(404, "Unknown taxonomy.");
    return catalogResponse(
      await taxonomy(s.user.id, kind, await jsonBody(r), remove),
    );
  } catch (e) {
    return catalogError(e);
  }
}
export async function POST(r: Request, c: Context) {
  return handle(r, c);
}
export async function DELETE(r: Request, c: Context) {
  return handle(r, c, true);
}
