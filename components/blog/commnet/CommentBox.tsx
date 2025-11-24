"use client";

import CommentTextArea from "@/components/blog/_internal/CommentTextArea";
import SubmitButton from "@/components/blog/_internal/SubmitButton";
import { useUser } from "@/hooks/useUser";
import { insertComment } from "@/lib/blog/comment.actions";

interface CommentBoxProps {
  postId: string;
}

function CommentBox({ postId }: CommentBoxProps) {
  const { author: authorName } = useUser();
  const author = authorName ?? "anonymous";
  const avatar = author.charAt(0).toUpperCase();

  return (
    <form
      className="border-tertiary mb-6 rounded-lg border p-4"
      action={insertComment.bind(null, postId)}
      key={postId}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-tertiary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <span className="text-secondary text-xs">{avatar}</span>
          </div>
          <div className="text-secondary mb-1 text-xs">{author}</div>
        </div>
        <div>
          <div className="flex-1">
            <CommentTextArea />
            <div className="mt-3 flex justify-end">
              <SubmitButton text="댓글 등록" />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentBox;
