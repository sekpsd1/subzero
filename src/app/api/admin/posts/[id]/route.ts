import { requireApi } from "@/lib/auth/server";
import { catalogError, catalogResponse, jsonBody } from "@/lib/catalog/http";
import { getPrisma } from "@/lib/prisma";
import { postInclude, savePost, lifecycle } from "@/lib/posts/service";
type Context = { params: Promise<{ id: string }> };
export async function GET(r: Request, c: Context) {
  try {
    await requireApi(r);
    const post = await getPrisma().post.findUnique({
      where: { id: (await c.params).id },
      include: postInclude,
    });
    return post ? catalogResponse(post) : catalogResponse(null, 404);
  } catch (e) {
    return catalogError(e);
  }
}
export async function PATCH(r: Request, c: Context) {
  try {
    const s = await requireApi(r);
    return catalogResponse(
      await savePost(
        s.user.id,
        s.user.role,
        await jsonBody(r),
        (await c.params).id,
      ),
    );
  } catch (e) {
    return catalogError(e);
  }
}
export async function DELETE(r: Request, c: Context) {
  try {
    const s = await requireApi(r, ["ADMIN"]);
    return catalogResponse(
      await lifecycle(s.user.id, (await c.params).id, await jsonBody(r), false),
    );
  } catch (e) {
    return catalogError(e);
  }
}
