"use client";

import { submitComment } from "@/app/blog/actions";
import { FormEvent } from "react";

interface CommentBoxProps {
  postId: string;
}

function CommentBox({ postId }: CommentBoxProps) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("post_id", postId);

    const result = await submitComment(formData);

    if (result?.error) {
      console.error(result.error);
    } else {
      form.reset();
    }
  };
  return (
    <form
      className="mb-6 rounded-lg border border-neutral-200 p-4"
      onSubmit={handleSubmit}
    >
      <div className="flex items-start gap-3">
        {/* 프로필 동그라미 */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-xs text-neutral-600">U</span>
        </div>
        <div className="flex-1">
          <textarea
            name="comment-area"
            className="w-full resize-none rounded-md border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400"
            rows={3}
            placeholder="댓글을 입력하세요"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
            >
              댓글 등록
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentBox;
