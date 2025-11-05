import { IBlogPostItem } from "@/components/blog/BlogItem";
import BlogList from "@/components/blog/BlogList";
import { createClient } from "@/utils/supabase/server";

async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("posts").select();

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
        <BlogList items={posts as IBlogPostItem[]} />
      </div>
    </main>
  );
}

export default BlogPage;
