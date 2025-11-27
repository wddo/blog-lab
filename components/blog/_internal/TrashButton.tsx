"use client";

import Button from "@/components/ui/button";
import DialogModal from "@/components/ui/dialog-modal";
import Icon from "@/components/ui/Icon";
import { HTMLAttributes, useState } from "react";

type TrashButtonProps = {
  onDelete: () => Promise<void>;
} & HTMLAttributes<HTMLDivElement>;

function TrashButton({ onDelete, ...props }: TrashButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    await onDelete();
    setIsOpen(false);
    setPending(false);
  };

  return (
    <div {...props}>
      <Button variant="outline" type="submit" onClick={() => setIsOpen(true)}>
        <Icon name="trash" />
      </Button>

      <DialogModal
        title="Delete"
        isOpen={isOpen}
        onConfirm={handleDelete}
        onClose={() => setIsOpen(false)}
        disabled={pending}
      >
        삭제하시겠습니까?
      </DialogModal>
    </div>
  );
}

export default TrashButton;
