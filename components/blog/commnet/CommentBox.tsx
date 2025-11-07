"use client";

import Button from "@/components/ui/button";
import { addComment } from "@/lib/blog/actions";
import { FormEvent, useRef, useState } from "react";

interface CommentBoxProps {
  postId: string;
}

function CommentBox({ postId }: CommentBoxProps) {
  const commentAreaRef = useRef<HTMLTextAreaElement>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("post_id", postId);

    const result = await addComment(formData);

    if (result?.error) {
      alert("내용을 입력해주세요.");
      const commentArea = commentAreaRef.current;
      console.error(result.error);
      if (commentArea) {
        commentArea.value = "";
        commentArea.focus();
      }
    } else {
      form.reset();
      setIsPending(false);
    }
  };

  return (
    <form
      className="mb-6 rounded-lg border border-neutral-200 p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">U</span>
        </div>
        <div className="flex-1">
          <textarea
            name="comment-area"
            ref={commentAreaRef}
            required
            className="w-full resize-none rounded-md border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="댓글을 입력하세요"
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" disabled={isPending}>
              {isPending ? "등록중..." : "댓글 등록"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentBox;
