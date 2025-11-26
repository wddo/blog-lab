"use client";

import BackButton from "@/components/blog/_internal/BackButton";
import SubmitButton from "@/components/blog/_internal/SubmitButton";
import ImageUploadFrom, {
  ImageUploadFormHandle,
} from "@/components/blog/image/ImageUploadForm";
import { BlogPostItem } from "@/types/blog";
import { FormHTMLAttributes, useEffect, useRef, useState } from "react";

type EditFormProps = {
  data?: Partial<BlogPostItem>;
} & FormHTMLAttributes<HTMLFormElement>;

function EditForm({ data, ...rest }: EditFormProps) {
  const { id, title, content, post_images } = data ?? {};

  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // useState는 첫 마운트 시 값이 변경되 불필요한 리렌더링이 발생하므로 useRef 를 사용
  const imageFormRef = useRef<ImageUploadFormHandle>(null);

  // 페이지 마운트 시 폼 초기화
  useEffect(() => {
    formRef.current?.reset();
    imageFormRef.current?.reset();
  }, []);

  // bfcache에서 복원 시 초기화 (수정 페이지는 마운트 시 reset 불필요)
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
    <div>
      <form className="flex flex-col gap-4" ref={formRef} {...rest}>
        {id ? <input name="post-id" value={id} hidden readOnly /> : null}
        <input
          name="title"
          placeholder="제목을 입력하세요"
          disabled={pending}
          className="border-secondary w-full rounded border p-3"
          defaultValue={title}
        />

        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          rows={15}
          className="border-secondary w-full resize-none rounded border p-3"
          required
          disabled={pending}
          defaultValue={content}
        />

        <ImageUploadFrom
          ref={imageFormRef}
          disabled={pending}
          images={post_images}
        />

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
    </div>
  );
}

export default EditForm;
