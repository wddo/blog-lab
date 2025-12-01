"use client";

import { AUTH_PATHS, PROTECTED_PATHS } from "@/data/constants";
import { useUser } from "@/hooks/useUser";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

/**
 * 클라이언트 사이드 인증 가드
 * - bfcache 복원 시 인증 상태 체크
 * - 인증 상태 변경 시 인증 관련 경로에서 리다이렉트
 * - 보호된 경로 접근 시 세션 만료 체크 및 리다이렉트
 */
function AuthGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useUser();

  // 인증 상태 체크 후 필요시 리다이렉트
  const checkAuth = useCallback(() => {
    const isProtectedPath = PROTECTED_PATHS.some((path) =>
      pathname.startsWith(path),
    );
    const isAuthPath = AUTH_PATHS.includes(pathname);

    let redirectPath: string | null = null;

    // 보호된 경로에 접근하는데 세션이 없으면 로그인 페이지로 리다이렉트
    if (!user && isProtectedPath) {
      redirectPath = `/login?referrer=${encodeURIComponent(pathname)}`;
    }
    // 로그인된 사용자가 인증 관련 경로에 접근하면 리다이렉트
    else if (user && isAuthPath) {
      redirectPath = searchParams.get("referrer") || "/blog";
    }

    if (redirectPath) {
      router.replace(redirectPath);
    }
  }, [user, pathname, searchParams, router]);

  // 인증 상태 변경 시 체크 및 리다이렉트
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // bfcache 복원 시 체크
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        checkAuth();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [checkAuth]);

  return null;
}

export default AuthGuard;
