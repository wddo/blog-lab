"use client";

import Button from "@/components/ui/button";
import { signInWithEmail } from "@/lib/auth/auth.actions";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referrer = searchParams.get("referrer") || "/blog";

  const handleSignInWithEmail = async (formData: FormData) => {
    await signInWithEmail(formData);
    router.replace(referrer);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">로그인</h1>

      <form className="space-y-4" action={handleSignInWithEmail}>
        <input type="hidden" name="referrer" value={referrer} />

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="rounded-md border border-gray-300 px-3 py-2"
          />
        </div>

        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
