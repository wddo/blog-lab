"use client";

import { createClientSupabase } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  author: string | undefined;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  author: undefined,
});

type UserProviderProps = PropsWithChildren & {
  initialUser?: User | null;
};

function UserProvider({ children, initialUser }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const author = user?.email?.split("@")[0];

  useEffect(() => {
    const supabase = createClientSupabase();

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
