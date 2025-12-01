"use client";

import { UserContext, UserContextType } from "@/providers/UserProvider";
import { useContext } from "react";

export function useUser(): UserContextType {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
