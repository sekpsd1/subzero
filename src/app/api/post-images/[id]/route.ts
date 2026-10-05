import { currentSession } from "@/lib/auth/server";
import { getPrisma } from "@/lib/prisma";
import { readImage } from "@/lib/posts/images";
const headers = {
  "Cache-Control": "private, no-store",
  Vary: "Cookie",
  "X-Content-Type-Options": "nosniff",
};
export async function GET(_r: Request, c: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await c.params;
    if (!/^[a-f0-9-]{36}$/.test(id))
      return new Response(null, { status: 404, headers });
    const url = "/api/post-images/" + id;
    const post = await getPrisma().post.findFirst({
      where: { coverImage: url },
      select: { status: true, deletedAt: true, publishedAt: true },
    });
    if (!post) return new Response(null, { status: 404, headers });
    if (
      (post.status !== "PUBLISHED" ||
        post.deletedAt ||
        !post.publishedAt ||
        post.publishedAt > new Date()) &&
      !(await currentSession())
    )
      return new Response(null, { status: 404, headers });
    return new Response(new Uint8Array(await readImage(id)), {
      headers: { ...headers, "Content-Type": "image/webp" },
    });
  } catch {
    return new Response(null, { status: 404, headers });
  }
}
