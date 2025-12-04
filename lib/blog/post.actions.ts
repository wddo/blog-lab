"use server";

import { getUser } from "@/lib/auth/auth.actions";
import { BlogPostItem, PostImage } from "@/types/blog";
import { createServerSupabase } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// ==================== 조회 ====================

export async function getPosts(keyword?: string): Promise<BlogPostItem[]> {
  "use cache: private";

  const supabase = await createServerSupabase();
  let query = supabase.from("posts").select("*, post_images(*)");

  if (keyword) {
    // 검색 기능
    query = query.textSearch("title", `'${keyword}'`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

// 단일 게시글 조회
export async function getPost(id: string): Promise<BlogPostItem> {
  "use cache: private";

  cacheTag(`post-${id}`);

  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("posts")
    .select("*, post_images(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// ==================== 작성 ====================

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
  const postImages = await createPostImagesData(post.id, images);

  if (postImages.length > 0) {
    const { error: imagesError } = await supabase
      .from("post_images")
      .insert(postImages);

    if (imagesError) {
      throw new Error(`이미지 저장 실패: ${imagesError.message}`);
    }
  }

  revalidatePath("/blog");
  redirect("/blog");
}

// ==================== 수정 ====================

export async function updatePost(formData: FormData) {
  const supabase = await createServerSupabase();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const files = formData.getAll("image") as File[];
  const postId = formData.get("post-id") as string;
  const previousImageNames = formData.getAll("previous-image") as string[]; // 유지할 기존 이미지

  if (!title || !content) {
    throw new Error("제목과 내용을 입력해주세요");
  }

  const { error } = await supabase
    .from("posts")
    .update({
      title,
      content,
    })
    .eq("id", postId)
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  // post_images 테이블에서 기존 이미지 목록 조회
  const { data: postImageColumns } = (await supabase
    .from("post_images")
    .select("*")
    .eq("post_id", postId)) as { data: PostImage[] | null };

  // 새로 업로드할 파일명 목록
  const validImages = files.filter((file) => file?.size > 0);

  // 삭제된 이미지
  const deletedColumn =
    postImageColumns?.filter(
      (column) => !previousImageNames.includes(column.image_name),
    ) ?? [];

  // storage에서 이미지 파일 삭제
  if (deletedColumn.length > 0) {
    const deletedImageNames = deletedColumn.map((column) => column.image_name);
    await deleteStorageImages(deletedImageNames);

    // post_images 테이블에서 레코드 삭제
    const deletedImageIds = deletedColumn.map((column) => column.id);
    const { error: deleteError } = await supabase
      .from("post_images")
      .delete()
      .in("id", deletedImageIds);

    if (deleteError) {
      throw new Error(`이미지 삭제 실패: ${deleteError.message}`);
    }
  }

  // 새 이미지 업로드 및 post_images 테이블 저장
  if (validImages.length > 0) {
    const postImages = await createPostImagesData(postId, validImages);

    const { error: imagesError } = await supabase
      .from("post_images")
      .insert(postImages);

    if (imagesError) {
      throw new Error(`이미지 저장 실패: ${imagesError.message}`);
    }
  }

  revalidatePath("/blog");
  revalidateTag(`post-${postId}`, {});
  redirect("/blog");
}

// ==================== 삭제 ====================

export async function deletePost(postId: string) {
  const supabase = await createServerSupabase();
  const user = await getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", postId)
    .eq("user_id", user.id)
    .select("post_images(*)")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // Storage에서 이미지 삭제
  const imageNames = data?.post_images?.map((image) => image.image_name) || [];
  await deleteStorageImages(imageNames);

  revalidatePath("/blog");
}

// ==================== 내부 헬퍼 함수 ====================

/**
 * 이미지 업로드 및 post_images 테이블 데이터 생성
 */
async function createPostImagesData(
  postId: string,
  files: File[],
): Promise<Omit<PostImage, "id">[]> {
  const validImages = files.filter((file) => file?.size > 0);

  if (validImages.length === 0) {
    return [];
  }

  return await Promise.all(
    validImages.map(async (image, index) => {
      const { name } = await uploadStrorageImage(image);

      return {
        post_id: postId,
        image_name: name,
        sort_order: index,
      };
    }),
  );
}

/**
 * 스토리지에서 이미지 삭제
 */
async function deleteStorageImages(imageNames: string[]) {
  const supabase = await createServerSupabase();

  if (imageNames.length) {
    try {
      await supabase.storage.from("post-images").remove(imageNames);
    } catch (error) {
      console.error("이미지 삭제 실패:", error);
    }
  }
}

/**
 * 스토리지에 이미지 업로드
 */
async function uploadStrorageImage(image: File): Promise<{ name: string }> {
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
