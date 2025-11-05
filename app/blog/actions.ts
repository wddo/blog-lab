"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitComment(formData: FormData) {
  const content = formData.get("comment-area") as string;
  const postId = formData.get("post_id") as string;

  if (!content?.trim()) {
    return { error: "Content is required" };
  }

  if (!postId) {
    return { error: "Post ID is required" };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author: "tester",
      content,
    })
    .select();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/blog");

  return { success: true, data };
}

export async function getComments(postId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return data || [];
}
