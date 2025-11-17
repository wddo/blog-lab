import InteractionButtons from "@/components/blog/_internal/InteractionButtons";
import CommentBox from "@/components/blog/commnet/CommentBox";
import CommentList from "@/components/blog/commnet/CommentList";
import CommentListSkeleton from "@/components/blog/commnet/skeleton/CommentListSkeleton";
import ImageList from "@/components/blog/image/ImageList";
import { BlogPostItem } from "@/types/blog";
import { Suspense } from "react";

export type BlogItemProps = {
  item: BlogPostItem;
};

function BlogItem({ item }: BlogItemProps) {
  const { id, title, imageUrl, content } = item;

  return (
    <article className="border-tertiary mx-auto w-full max-w-3xl rounded-lg border">
      <ImageList images={imageUrl} />

      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold tracking-tight">{title}</h2>
        <div className="mt-5 mb-6 leading-relaxed whitespace-pre-wrap">
          {content}
        </div>

        <InteractionButtons />

        <CommentBox postId={id} />

        <Suspense fallback={<CommentListSkeleton />}>
          <CommentList postId={id} />
        </Suspense>
      </div>
    </article>
  );
}

export default BlogItem;
