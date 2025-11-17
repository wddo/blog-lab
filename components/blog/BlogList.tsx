import { BlogPostItem } from "@/types/blog";
import { Suspense } from "react";
import BlogItem from "./BlogItem";

export type BlogListProps = {
  items: BlogPostItem[];
};

export default function BlogList({ items }: BlogListProps) {
  return (
    <section className="space-y-10">
      <Suspense fallback={<div>리스트 로딩중...</div>}>
        {items.map((item) => (
          <BlogItem key={item.id} item={item} />
        ))}
      </Suspense>
    </section>
  );
}
