import InteractionButtons from "@/components/blog/_internal/InteractionButtons";
import CommentBox from "@/components/blog/commnet/CommentBox";
import CommentList from "@/components/blog/commnet/CommentList";
import ImageList from "@/components/blog/image/ImageList";
import { IBlogPostItem } from "@/types/blog";

export interface BlogItemProps {
  item: IBlogPostItem;
}

function BlogItem({ item }: BlogItemProps) {
  const { id, title, imageUrl, content } = item;

  return (
    <article className="mx-auto w-full max-w-3xl rounded-lg border border-neutral-200">
      <ImageList images={imageUrl} />

      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold tracking-tight">{title}</h2>
        <div className="mt-5 mb-6 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        <InteractionButtons />

        <CommentBox postId={id} />
        <CommentList postId={id} />
      </div>
    </article>
  );
}

export default BlogItem;
