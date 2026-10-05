import { requirePage } from "@/lib/auth/server";
import { options } from "@/lib/posts/service";
import PostsShell from "@/components/AdminPosts/PostsShell";
import TaxonomyEditor from "@/components/AdminPosts/TaxonomyEditor";
export default async function Page() {
  const s = await requirePage();
  return (
    <PostsShell title="Post categories & tags">
      <TaxonomyEditor {...await options()} isAdmin={s.user.role === "ADMIN"} />
    </PostsShell>
  );
}
