"use server";

import { IUser } from "@/types/user";
import { createServerSupabase } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// 회원가입
export const signUpNewUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "/blog",
    },
  });

  if (!error) {
    redirect("/login");
  } else {
    throw new Error(error.message);
  }
};

// 로그인
export const signInWithEmail = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!error) {
    redirect("/blog");
  } else {
    throw new Error(error.message);
  }
};

// 로그아웃
export const signOut = async () => {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();

  if (!error) {
    redirect("/blog");
  }
};

export const getUser = async () => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user as IUser;
};
