import BlogList from "@/components/blog/BlogList";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { getUser } from "@/lib/auth/actions";
import { getPosts } from "@/lib/blog/actions";
import { revalidatePath } from "next/cache";

async function BlogPage() {
  const posts = await getPosts();
  const user = await getUser();

  const handleRefresh = async () => {
    "use server";

    await revalidatePath("/blog");
  };

  return (
    <main className="p-4">
      <div className="flex flex-col space-y-4">
        <h1 className="flex-1 text-3xl font-bold tracking-tight">Blog</h1>
        <Header user={user} />
        <BlogList items={posts} />
      </div>
      <form action={handleRefresh}>
        <Button
          type="submit"
          variant="outline"
          className="fixed right-4 bottom-4"
        >
          <Icon name="refresh" size={16} />
        </Button>
      </form>
    </main>
  );
}

export default BlogPage;
