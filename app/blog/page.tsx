import BlogList from "@/components/blog/BlogList";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { getPosts } from "@/lib/blog/actions";
import { cacheLife, revalidateTag } from "next/cache";

async function BlogPage() {
  "use cache";

  cacheLife({
    stale: 60, // 60초 후 캐시 만료
    revalidate: 10, // 10초마다 백그라운드에서 재검증
    expire: 600, // 10분 후 캐시 완전 만료
  });

  const posts = await getPosts();
  const date = new Date().toLocaleString(); // 10초 마다 갱신 확인용

  const handleRefresh = async () => {
    "use server";

    await revalidateTag("blog-data", {});
  };

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm text-gray-500">cached at: {date}</p>
        <div className="flex">
          <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
          <form className="ml-auto" onSubmit={handleRefresh}>
            <Button type="submit" variant="outline">
              <Icon name="refresh" size={16} />
            </Button>
          </form>
        </div>
        <BlogList items={posts} />
      </div>
    </main>
  );
}

export default BlogPage;
