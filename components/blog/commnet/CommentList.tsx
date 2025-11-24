import { getComments } from "@/lib/blog/comment.actions";
import CommentItem from "./CommentItem";

type CommentListProps = {
  postId: string;
};

async function CommentList({ postId }: CommentListProps) {
  const comments = await getComments(postId);

  if (!comments || comments.length === 0) {
    return <div className="text-sm text-neutral-500">댓글이 없습니다.</div>;
  }

  return (
    <ul className="space-y-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentList;
