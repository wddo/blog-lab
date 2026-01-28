"use client";

import { InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const { pending } = useFormStatus();

  return (
    <input
      disabled={pending}
      className={`${className} ${pending ? `bg-neutral-100` : ``}`}
      {...props}
    />
  );
}

export default Input;
