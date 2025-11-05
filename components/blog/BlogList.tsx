import BlogItem, { IBlogPostItem } from "./BlogItem";

export type IBlogListItem = IBlogPostItem;

export interface BlogListProps {
  items: IBlogListItem[];
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
