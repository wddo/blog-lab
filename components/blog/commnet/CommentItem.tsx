"use client";

import DialogModal from "@/components/ui/dialog-modal";
import Icon from "@/components/ui/Icon";
import { deleteComment } from "@/lib/blog/actions";
import type { IComment } from "@/types/blog";
import { useState } from "react";

interface ICommentItemProps {
  comment: IComment;
}

function CommentItem({ comment }: ICommentItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setIsDeleted(true);

    try {
      await deleteComment(comment.id);
    } catch (error) {
      console.error("삭제 실패:", error);
      setIsDeleted(false);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (isDeleted) return null;

  return (
    <>
      <li className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200">
          <span className="text-[10px] text-neutral-600">
            {comment.author[0]?.toUpperCase() || "U"}
          </span>
        </div>
        <div className="flex-1">
          <div className="mb-1 text-xs text-neutral-500">{comment.author}</div>
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </div>
        </div>
        <button
          type="button"
          onClick={handleDeleteClick}
          className="flex items-center justify-center rounded-md p-2 text-xs text-neutral-500 hover:bg-neutral-200"
        >
          <Icon name="trash" size={16} title="삭제" />
        </button>
      </li>

      <DialogModal
        isOpen={showConfirm}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      >
        댓글을 삭제하시겠습니까?
      </DialogModal>
    </>
  );
}

export default CommentItem;
