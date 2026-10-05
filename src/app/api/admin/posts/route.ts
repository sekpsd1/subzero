import { requireApi } from "@/lib/auth/server";
import { catalogError, catalogResponse, jsonBody } from "@/lib/catalog/http";
import { listPosts, savePost } from "@/lib/posts/service";
export async function GET(r: Request) {
  try {
    await requireApi(r);
    return catalogResponse(await listPosts(new URL(r.url).searchParams));
  } catch (e) {
    return catalogError(e);
  }
}
export async function POST(r: Request) {
  try {
    const s = await requireApi(r);
    return catalogResponse(
      await savePost(s.user.id, s.user.role, await jsonBody(r)),
      201,
    );
  } catch (e) {
    return catalogError(e);
  }
}
