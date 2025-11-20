"use client";

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type BackButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement> &
  PropsWithChildren;

function BackButton({ children, ...props }: BackButtonProps) {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} {...props}>
      {children}
    </button>
  );
}

export default BackButton;
