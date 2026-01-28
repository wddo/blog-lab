"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { signUpNewUser } from "@/lib/auth/auth.actions";
import Link from "next/link";
import { useEffect, useRef } from "react";

function SignupPage() {
  const formRef = useRef<HTMLFormElement>(null);

  // 페이지 마운트 시 폼 초기화
  useEffect(() => {
    formRef.current?.reset();
  }, []);

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">회원가입</h1>

      <form className="space-y-4" action={signUpNewUser} ref={formRef}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            type="password"
            name="password"
            placeholder="******"
            required
            minLength={6}
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <Button type="submit" className="w-full">
          가입하기
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          로그인
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
