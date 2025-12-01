"use client";

import CommentTextArea from "@/components/blog/_internal/CommentTextArea";
import Button from "@/components/ui/button";
import DialogModal from "@/components/ui/dialog-modal";
import Icon from "@/components/ui/Icon";
import { useUser } from "@/hooks/useUser";
import { deleteComment, updateComment } from "@/lib/blog/comment.actions";
import type { Comment } from "@/types/blog";
import { useOptimistic, useState } from "react";

type CommentItemProps = {
  comment: Comment;
};

function CommentItem({ comment }: CommentItemProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const { author } = useUser();

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleCancelEdit = () => {
    setShowEdit(false);
  };

  const handleConfirm = async () => {
    setShowConfirm(false);
    setIsDeleted(true);

    try {
      await deleteComment(comment.id);
    } catch {
      setIsDeleted(false);
      alert("삭제에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleEdit = async (formData: FormData) => {
    const textareaValue = formData.get("comment-area") as string;
    updateOptimisticCommentValue(textareaValue);
    try {
      await updateComment(comment.id, formData);
      setShowEdit(false);
    } catch {
      alert("수정에 실패했습니다.");
    }
  };

  const [optimisticCommentValue, updateOptimisticCommentValue] = useOptimistic<
    string,
    string
  >(comment.content, (_, optimistic) => {
    return optimistic;
  });

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
            {showEdit ? (
              <form>
                <div className="relative">
                  <CommentTextArea defaultValue={comment.content} />
                  <div className="flex justify-end gap-2">
                    <Button type="submit" formAction={handleEdit}>
                      수정
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              optimisticCommentValue
            )}
          </div>
        </div>
        {author === comment.author && !showEdit ? (
          <>
            <button
              type="button"
              onClick={handleEditClick}
              className="text-secondary hover:bg-secondary-hover flex items-center justify-center rounded-md p-2 text-xs"
            >
              <Icon name="pencil" size={16} title="수정" />
            </button>
            <button
              type="button"
              onClick={handleDeleteClick}
              className="text-secondary hover:bg-secondary-hover flex items-center justify-center rounded-md p-2 text-xs"
            >
              <Icon name="trash" size={16} title="삭제" />
            </button>
          </>
        ) : null}
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
