import { IBlogPostItem } from "@/types/blog";
import { Suspense } from "react";
import BlogItem from "./BlogItem";

export interface BlogListProps {
  items: IBlogPostItem[];
}

export default function BlogList({ items }: BlogListProps) {
  return (
    <section className="space-y-10">
      <Suspense fallback={<div>Loading...</div>}>
        {items.map((item) => (
          <BlogItem key={item.id} item={item} />
        ))}
      </Suspense>
    </section>
  );
}
