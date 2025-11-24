"use server";

import { getUser } from "@/lib/auth/auth.actions";
import { Comment } from "@/types/blog";
import { createClientSupabase } from "@/utils/supabase/client";
import { createServerSupabase } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// ==================== 조회 ====================

export async function getComments(postId: string): Promise<Comment[]> {
  "use cache";

  const supabase = createClientSupabase();
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

// ==================== 작성 ====================

export async function insertComment(postId: string, formData: FormData) {
  const content = formData.get("comment-area") as string;

  if (!content?.trim()) {
    throw new Error("Content is required");
  }

  if (!postId) {
    throw new Error("Post ID is required");
  }

  const supabase = await createServerSupabase();
  const user = await getUser();

  const { error } = await supabase.from("comments").insert({
    post_id: postId,
    author: user?.email?.split("@")[0] ?? "anonymous",
    content,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}

// ==================== 수정 ====================

export async function updateComment(commentId: string, formData: FormData) {
  const content = formData.get("comment-area") as string;

  if (!content?.trim()) {
    throw new Error("Content is required");
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}

// ==================== 삭제 ====================

export async function deleteComment(commentId: string) {
  const supabase = await createServerSupabase();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}
