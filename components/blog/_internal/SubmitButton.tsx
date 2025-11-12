"use client";

import Button from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="text-sm">
      {pending ? "등록중..." : "댓글 등록"}
    </Button>
  );
}

export default SubmitButton;
