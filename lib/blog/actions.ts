"use server";

import { IBlogPostItem, IComment } from "@/types/blog";
import {
  createPrivateClient,
  createPublicClient,
} from "@/utils/supabase/server";
import { cacheTag, revalidatePath } from "next/cache";

export async function getPosts(): Promise<IBlogPostItem[]> {
  "use cache";

  cacheTag("blog-data");

  console.log("🔥 getPosts() 실행됨!", new Date().toLocaleString());

  const supabase = createPublicClient();
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function addComment(formData: FormData) {
  const content = formData.get("comment-area") as string;
  const postId = formData.get("post_id") as string;

  if (!content?.trim()) {
    return { error: "Content is required" };
  }

  if (!postId) {
    return { error: "Post ID is required" };
  }

  const supabase = await createPrivateClient();
  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: postId,
      author: "tester",
      content,
    })
    .select();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}

export async function getComments(postId: string): Promise<IComment[]> {
  const supabase = createPublicClient();
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

export async function deleteComment(commentId: string) {
  const supabase = await createPrivateClient();
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/blog");
}
