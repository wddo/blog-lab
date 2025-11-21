import InteractionButtons from "@/components/blog/_internal/InteractionButtons";
import TrashButton from "@/components/blog/_internal/trashButton";
import CommentBox from "@/components/blog/commnet/CommentBox";
import CommentList from "@/components/blog/commnet/CommentList";
import CommentListSkeleton from "@/components/blog/commnet/skeleton/CommentListSkeleton";
import ImageList from "@/components/blog/image/ImageList";
import { getUser } from "@/lib/auth/actions";
import { deletePost } from "@/lib/blog/actions";
import { BlogPostItem } from "@/types/blog";
import { Suspense } from "react";

export type BlogItemProps = {
  item: BlogPostItem;
};

async function BlogItem({ item }: BlogItemProps) {
  const { id, user_id, title, post_images, content } = item;

  const checkUser = async () => {
    const user = await getUser();

    return user?.id === user_id;
  };

  const handleDelete = async () => {
    "use server";

    await deletePost(
      id,
      post_images.map((data) => data.image_name),
    );
  };

  const isUser = await checkUser();

  return (
    <article className="border-tertiary relative mx-auto w-full max-w-3xl rounded-lg border">
      {isUser ? (
        <TrashButton
          onDelete={handleDelete}
          className="absolute top-2 right-2 z-1"
        ></TrashButton>
      ) : null}

      <ImageList images={post_images} />

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
