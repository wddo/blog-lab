"use client";
import ImageInput from "@/components/blog/_internal/ImageInput";
import { PostImage } from "@/types/blog";
import { RefObject, useImperativeHandle, useState } from "react";

export type ImageUploadFormHandle = {
  reset: () => void;
};

type ImageUploadFromProps = {
  images?: PostImage[];
  disabled: boolean;
  ref: RefObject<ImageUploadFormHandle | null>;
};

function ImageUploadForm({ images, disabled, ref }: ImageUploadFromProps) {
  const maxImages = 4;
  const existingCount = images?.length || 0;

  // 고정된 슬롯 배열 사용 (리렌더링 시 컴포넌트 유지)
  const [slots, setSlots] = useState<(null | File)[]>(() => {
    // 기존 이미지 + 빈 슬롯 1개
    return Array(Math.min(existingCount + 1, maxImages)).fill(null);
  });
  const [resetKey, setResetKey] = useState(0);

  const handleFileSelected = (index: number) => {
    // 마지막 슬롯에 파일 선택 시 새 슬롯 추가
    if (index === slots.length - 1 && slots.length < maxImages) {
      setSlots((prev) => [...prev, null]);
    }
  };

  // 부모 컴포넌트에서 호출할 수 있는 reset 함수
  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        setSlots(Array(Math.min(existingCount + 1, maxImages)).fill(null));
        setResetKey((prev) => prev + 1); // key 변경으로 완전 리마운트
      },
    }),
    [existingCount],
  );

  return (
    <>
      <p className="text-secondary text-sm">
        {maxImages
          ? `최대 ${maxImages}장까지 업로드 가능합니다.`
          : "이미지를 업로드하세요."}
      </p>

      <div className="flex gap-2">
        {slots.map((_, index) => (
          <ImageInput
            key={`${resetKey}-${index}`}
            disabled={disabled}
            src={images?.[index]?.image_name}
            onFileSelected={
              index === slots.length - 1
                ? () => handleFileSelected(index)
                : undefined
            }
          />
        ))}
      </div>
    </>
  );
}

export default ImageUploadForm;
