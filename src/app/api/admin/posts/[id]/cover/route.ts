import { requireApi } from "@/lib/auth/server";
import { catalogError, catalogResponse, jsonBody } from "@/lib/catalog/http";
import { uploadImage, removeCover } from "@/lib/posts/images";
type Context = { params: Promise<{ id: string }> };
export async function POST(r: Request, c: Context) {
  try {
    const s = await requireApi(r);
    return catalogResponse(
      await uploadImage(
        r,
        s.user.id,
        (await c.params).id,
        s.user.role === "ADMIN",
      ),
    );
  } catch (e) {
    return catalogError(e);
  }
}
export async function DELETE(r: Request, c: Context) {
  try {
    const s = await requireApi(r);
    return catalogResponse(
      await removeCover(
        s.user.id,
        (await c.params).id,
        await jsonBody(r),
        s.user.role === "ADMIN",
      ),
    );
  } catch (e) {
    return catalogError(e);
  }
}
