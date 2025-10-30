import BlogItem, { BlogPostItem } from "./BlogItem";

export type BlogListItem = BlogPostItem;

export interface BlogListProps {
  items: BlogListItem[];
}

export default function BlogList({ items }: BlogListProps) {
  return (
    <section className="space-y-10">
      {items.map((item) => (
        <BlogItem key={item.id} item={item} />
      ))}
    </section>
  );
}
