"use client";

import Button from "@/components/ui/button";
import { useEffect } from "react";

function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="text-sm text-gray-500">{error.message}</p>
      <Button onClick={() => reset()}>Reset</Button>
    </div>
  );
}

export default Error;
