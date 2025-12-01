"use client";

import { createClientSupabase } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type UserContextType = {
  user: User | null;
  author: string | undefined;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  author: undefined,
});

type UserProviderProps = PropsWithChildren;

/**
 * 사용자 인증 상태를 제공하는 Context Provider
 * - 인증 상태 관리만 담당
 * - 리다이렉트 로직은 AuthGuard에서 처리
 */
function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const author = user?.email?.split("@")[0];

  useEffect(() => {
    const supabase = createClientSupabase();

    // 초기 인증 상태 설정
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 실시간 인증 상태 구독
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, author }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
