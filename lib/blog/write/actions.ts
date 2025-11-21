"use server";

import { getUser } from "@/lib/auth/actions";
import { PostImage } from "@/types/blog";
import { createServerSupabase } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

/**
 * 게시글 작성 (이미지 포함)
 */
export async function createPost(formData: FormData): Promise<void> {
  const supabase = await createServerSupabase();

  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const images = formData.getAll("image") as File[];

  if (!title || !content) {
    throw new Error("제목과 내용을 입력해주세요");
  }

  // 1. posts 테이블에 게시글 저장
  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({ title, content, user_id: user.id })
    .select("id")
    .single();

  if (postError || !post) {
    throw new Error(postError?.message || "게시글 작성 실패");
  }

  // 2. 이미지 처리 및 post_images 테이블 저장
  const postImages = await createPostImages(post.id, images);

  if (postImages.length > 0) {
    const { error: imagesError } = await supabase
      .from("post_images")
      .insert(postImages);

    if (imagesError) {
      throw new Error(`이미지 저장 실패: ${imagesError.message}`);
    }
  }

  redirect("/blog");
}

/**
 * 이미지 업로드 및 post_images 배열 생성
 */
async function createPostImages(
  postId: string,
  files: File[],
): Promise<PostImage[]> {
  const validImages = files.filter((file) => file?.size > 0);

  if (validImages.length === 0) {
    return [];
  }

  return await Promise.all(
    validImages.map(async (image, index) => {
      const { name } = await uploadImage(image);

      return {
        post_id: postId,
        image_name: name,
        sort_order: index,
      };
    }),
  );
}

/**
 * 스토리지에 이미지 업로드 및 공개 URL 반환
 */
async function uploadImage(image: File): Promise<{ name: string }> {
  const supabase = await createServerSupabase();

  const fileExt = image.name.split(".").pop() || "jpg";
  const uniqueFileName = `${randomUUID()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(uniqueFileName, image);

  if (error) {
    throw new Error(`이미지 업로드 실패: ${error.message}`);
  }

  return { name: uniqueFileName };
}
