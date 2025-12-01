import BlogList from "@/components/blog/BlogList";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { getUser } from "@/lib/auth/auth.actions";
import { getPosts } from "@/lib/blog/post.actions";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function getCachedTime() {
  "use cache";

  return new Date().toLocaleString(); // 캐싱되어 새로고침에 변경되지 않음
}

async function BlogPage() {
  const posts = await getPosts();
  const user = await getUser();
  const cachedTime = await getCachedTime();

  const handleRefresh = async () => {
    "use server";

    revalidatePath("/blog");
  };

  return (
    <div className="has-[#footer-buttons]:pb-18">
      <main className="p-4">
        <div className="flex flex-col space-y-4">
          <h1 className="flex-1 text-3xl font-bold tracking-tight">Blog</h1>
          <Header user={user} />
          <BlogList items={posts} />
        </div>
      </main>
      <footer className="fixed right-0 bottom-0 left-0 w-full bg-black/50">
        <form>
          <div
            className="right-4 flex justify-end gap-1 p-2"
            id="footer-buttons"
          >
            <p className="mr-auto flex items-center justify-center text-sm text-white">
              cached at: {cachedTime}
            </p>
            <Link
              href="/blog/write"
              className="bg-primary hover:bg-primary-hover flex items-center gap-1 rounded-md p-2 text-white"
            >
              <Icon name="write" size={16} />
              <div>
                <span className="text-sm">새 글 작성</span>
              </div>
            </Link>
            <Button
              type="submit"
              variant="outline"
              formAction={handleRefresh}
            >
              <Icon name="refresh" size={16} />
            </Button>
          </div>
        </form>
      </footer>
    </div>
  );
}

export default BlogPage;
