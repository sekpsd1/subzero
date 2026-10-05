import { notFound } from "next/navigation";
import { requirePage } from "@/lib/auth/server";
import { getPrisma } from "@/lib/prisma";
import { options, postInclude } from "@/lib/posts/service";
import PostsShell from "@/components/AdminPosts/PostsShell";
import PostEditor from "@/components/AdminPosts/PostEditor";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const s = await requirePage();
  const post = await getPrisma().post.findUnique({
    where: { id: (await params).id },
    include: postInclude,
  });
  if (!post) notFound();
  const o = await options();
  return (
    <PostsShell title="Edit post">
      <PostEditor
        initial={JSON.parse(JSON.stringify(post))}
        {...o}
        isAdmin={s.user.role === "ADMIN"}
      />
    </PostsShell>
  );
}
