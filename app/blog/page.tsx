import BlogList from "@/components/blog/BlogList";
import { getPosts } from "@/lib/blog/actions";
import { ErrorBoundary } from "react-error-boundary";

async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold tracking-tight">Blog</h1>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <BlogList items={posts} />
        </ErrorBoundary>
      </div>
    </main>
  );
}

export default BlogPage;
