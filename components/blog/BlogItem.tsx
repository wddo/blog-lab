import InteractionButtons from "@/components/blog/_internal/InteractionButtons";
import TrashButton from "@/components/blog/_internal/TrashButton";
import CommentBox from "@/components/blog/commnet/CommentBox";
import CommentList from "@/components/blog/commnet/CommentList";
import CommentListSkeleton from "@/components/blog/commnet/skeleton/CommentListSkeleton";
import ImageList from "@/components/blog/image/ImageList";
import Icon from "@/components/ui/Icon";
import { getUser } from "@/lib/auth/auth.actions";
import { deletePost } from "@/lib/blog/post.actions";
import { BlogPostItem } from "@/types/blog";
import Link from "next/link";
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

    await deletePost(id);
  };

  const isUser = await checkUser();

  return (
    <article className="border-tertiary relative mx-auto w-full max-w-3xl rounded-lg border">
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

      {isUser ? (
        <div className="absolute top-2 right-2 flex justify-end gap-2">
          <Link
            href={`/blog/edit/${id}`}
            className="border-tertiary hover:bg-tertiary-hover flex items-center gap-2 rounded-md border bg-white p-2"
          >
            <Icon name="write" />
          </Link>
          <TrashButton onDelete={handleDelete}></TrashButton>
        </div>
      ) : null}
    </article>
  );
}

export default BlogItem;
