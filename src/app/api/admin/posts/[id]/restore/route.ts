import { requireApi } from "@/lib/auth/server";
import { catalogError, catalogResponse, jsonBody } from "@/lib/catalog/http";
import { lifecycle } from "@/lib/posts/service";
export async function POST(r: Request, c: { params: Promise<{ id: string }> }) {
  try {
    const s = await requireApi(r, ["ADMIN"]);
    return catalogResponse(
      await lifecycle(s.user.id, (await c.params).id, await jsonBody(r), true),
    );
  } catch (e) {
    return catalogError(e);
  }
}
