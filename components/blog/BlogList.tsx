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
        {items.length > 0 ? (
          items.map((item) => <BlogItem key={item.id} item={item} />)
        ) : (
          <div className="flex items-center justify-center text-sm text-neutral-500">
            게시글이 없습니다.
          </div>
        )}
      </Suspense>
    </section>
  );
}
