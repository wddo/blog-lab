"use client";

import Button from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="small">
      {pending ? "처리중..." : text}
    </Button>
  );
}

export default SubmitButton;
