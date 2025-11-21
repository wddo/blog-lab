"use client";

import Button from "@/components/ui/button";
import { useEffect } from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  text: string;
  onPending?: (pending: boolean) => void;
};

function SubmitButton({ text, onPending }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  useEffect(() => {
    onPending?.(pending);
  }, [pending, onPending]);

  return (
    <Button type="submit" disabled={pending} size="small">
      {pending ? "처리중..." : text}
    </Button>
  );
}

export default SubmitButton;
