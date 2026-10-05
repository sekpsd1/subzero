import { requirePage } from "@/lib/auth/server";
import { options } from "@/lib/posts/service";
import PostsShell from "@/components/AdminPosts/PostsShell";
import PostEditor from "@/components/AdminPosts/PostEditor";
export default async function Page() {
  const s = await requirePage(),
    o = await options();
  return (
    <PostsShell title="Add post">
      <PostEditor initial={null} {...o} isAdmin={s.user.role === "ADMIN"} />
    </PostsShell>
  );
}
