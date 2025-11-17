"use client";

import { TextareaHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ICommentTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  defaultValue?: string;
}

function CommentTextArea({ defaultValue, ...props }: ICommentTextAreaProps) {
  const { pending } = useFormStatus();
  return (
    <textarea
      name="comment-area"
      defaultValue={defaultValue}
      required
      disabled={pending}
      className="w-full resize-none rounded-md border border-neutral-300 bg-white p-3 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
      rows={3}
      placeholder="댓글을 입력하세요"
      {...props}
    />
  );
}

export default CommentTextArea;
