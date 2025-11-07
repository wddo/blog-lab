"use client";

import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { FormEvent, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface IAlertProps extends PropsWithChildren {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

function DialogModal({
  title = "Confirm",
  children,
  isOpen,
  onClose,
  onConfirm,
  confirmText = "확인",
  cancelText = "취소",
}: IAlertProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onConfirm?.();
  };

  if (!isOpen) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-modal="true"
      className="fixed top-1/2 left-1/2 flex min-w-[300px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md p-4 text-sm backdrop:bg-black/50"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
        <div className="flex items-center justify-between">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          <Button
            type="button"
            className="ml-auto flex h-8 w-8 items-center justify-center"
            onClick={onClose}
            variant="none"
          >
            <Icon name="close" size={20} />
          </Button>
        </div>
        <div className="text-neutral-700">{children}</div>
        <div className="flex justify-center gap-2">
          <Button type="submit" variant="primary">
            {confirmText}
          </Button>
          <Button type="button" onClick={onClose} variant="outline">
            {cancelText}
          </Button>
        </div>
      </form>
    </dialog>,
    document.body,
  );
}

export default DialogModal;
