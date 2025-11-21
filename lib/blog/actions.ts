"use server";

import { getUser } from "@/lib/auth/actions";
import { BlogPostItem, Comment } from "@/types/blog";
import { createClientSupabase } from "@/utils/supabase/client";
import { createServerSupabase } from "@/utils/supabase/server";
import { cacheTag, revalidatePath } from "next/cache";

export async function getCachedTime(): Promise<string> {
  "use cache";

  cacheTag("posts");

  return new Date().toLocaleString();
}

export async function getPosts(): Promise<BlogPostItem[]> {
  "use cache";

  const supabase = createClientSupabase();
  const { data, error } = await supabase
    .from("posts")
    .select("*, post_images(*)");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function deletePost(postId: string, imageNames: string[]) {
  const supabase = await createServerSupabase();

  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("user_id", user.id);

  try {
    await supabase.storage.from("post-images").remove(imageNames);
  } catch {
    throw new Error("Failed to delete images");
  }

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}

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
