"use client";

import Button from "@/components/ui/button";

interface IErrorProps {
  error: Error;
  reset: () => void;
}

function Error({ error, reset }: IErrorProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <p className="text-sm text-gray-500">{error.message}</p>
      <Button onClick={() => reset()}>Reset</Button>
    </div>
  );
}

export default Error;
