"use client";

import BackButton from "@/components/blog/_internal/BackButton";
import SubmitButton from "@/components/blog/_internal/SubmitButton";
import ImageUploadFrom, {
  ImageUploadFormHandle,
} from "@/components/blog/image/ImageUploadForm";
import Icon from "@/components/ui/Icon";
import { createPost } from "@/lib/blog/post.actions";
import { useEffect, useRef, useState } from "react";

function WritePage() {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // useState는 첫 마운트 시 값이 변경되 불필요한 리렌더링이 발생하므로 useRef 를 사용
  const imageFormRef = useRef<ImageUploadFormHandle>(null);

  // 페이지 마운트 시 폼 초기화
  useEffect(() => {
    formRef.current?.reset();
    imageFormRef.current?.reset();
  }, []);

  // bfcache에서 복원 시 초기화
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        formRef.current?.reset();
        imageFormRef.current?.reset();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">새 글 작성</h1>
        <BackButton className="order-first flex items-center gap-2">
          <Icon name="back" size={16} />
        </BackButton>
      </div>
      <form className="flex flex-col gap-4" action={createPost} ref={formRef}>
        <input
          name="title"
          placeholder="제목을 입력하세요"
          disabled={pending}
          className="border-secondary w-full rounded border p-3"
        />

        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          rows={15}
          className="border-secondary w-full resize-none rounded border p-3"
          required
          disabled={pending}
        />

        <ImageUploadFrom ref={imageFormRef} disabled={pending} />

        <div className="flex justify-end gap-2">
          <SubmitButton text="작성하기" onPending={setPending} />
          <BackButton
            type="button"
            className="border-secondary hover:bg-tertiary-hover flex items-center gap-2 rounded-md border px-4 py-2"
            disabled={pending}
          >
            취소
          </BackButton>
        </div>
      </form>
    </main>
  );
}

export default WritePage;
