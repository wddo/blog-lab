export const STORAGE_BUCKET_NAME = "post-images";
export const STORAGE_BUCKET_URL = `https://nobmvxleqairxmebzuab.supabase.co/storage/v1/object/public/${STORAGE_BUCKET_NAME}`;

// 인증 관련 경로 상수
export const PROTECTED_PATHS: readonly string[] = ["/blog/write", "/blog/edit"];
export const AUTH_PATHS: readonly string[] = ["/login", "/signup"];
