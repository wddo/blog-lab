import BlogList from "@/components/blog/BlogList";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { getPosts } from "@/lib/blog/actions";
import { revalidatePath } from "next/cache";

async function BlogPage() {
  "use cache";

  const posts = await getPosts();
  const date = new Date().toLocaleString();

  const handleRefresh = async () => {
    "use server";

    await revalidatePath("/blog");
  };

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm text-gray-500">cached at: {date}</p>
        <div className="flex">
          <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>

          <form className="ml-auto" onSubmit={handleRefresh}>
            <Button
              type="submit"
              variant="outline"
              className="fixed right-4 bottom-4"
            >
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
