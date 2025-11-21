import BlogList from "@/components/blog/BlogList";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { getUser } from "@/lib/auth/actions";
import { getPosts } from "@/lib/blog/actions";
import UserProvider from "@/providers/UserProvider";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function BlogPage() {
  const posts = await getPosts();
  const user = await getUser();

  const handleRefresh = async () => {
    "use server";

    await revalidatePath("/blog");
  };

  return (
    <UserProvider initialUser={user}>
      <main className="p-4 has-[#footer-buttons]:pb-18">
        <div className="flex flex-col space-y-4">
          <h1 className="flex-1 text-3xl font-bold tracking-tight">Blog</h1>
          <Header user={user} />
          <BlogList items={posts} />
        </div>
        <form>
          <div
            className="fixed right-4 bottom-4 flex gap-1"
            id="footer-buttons"
          >
            <Link
              href="/blog/write"
              className="bg-primary hover:bg-primary-hover flex items-center gap-1 rounded-md p-2 text-white"
            >
              <Icon name="write" size={16} />
              <div>
                <span className="text-sm">새 글 작성</span>
              </div>
            </Link>
            <Button type="submit" variant="outline" formAction={handleRefresh}>
              <Icon name="refresh" size={16} />
            </Button>
          </div>
        </form>
      </main>
    </UserProvider>
  );
}

export default BlogPage;
