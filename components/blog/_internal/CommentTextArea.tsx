"use client";

import { TextareaHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

type CommentTextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  defaultValue?: string;
};

function CommentTextArea({ defaultValue, ...props }: CommentTextAreaProps) {
  const { pending } = useFormStatus();
  return (
    <textarea
      name="comment-area"
      defaultValue={defaultValue}
      required
      disabled={pending}
      className="border-tertiary focus:ring-primary-hover w-full resize-none rounded-md border p-3 text-sm outline-none focus:border-transparent focus:ring-2 disabled:opacity-50"
      rows={3}
      placeholder="댓글을 입력하세요"
      {...props}
    />
  );
}

export default CommentTextArea;
