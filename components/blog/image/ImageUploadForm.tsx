"use client";
import ImageInput from "@/components/blog/_internal/ImageInput";
import { RefObject, useImperativeHandle, useState } from "react";

export type ImageUploadFormHandle = {
  reset: () => void;
};

type ImageUploadFromProps = {
  disabled: boolean;
  ref: RefObject<ImageUploadFormHandle | null>;
};

function ImageUploadForm({ disabled, ref }: ImageUploadFromProps) {
  const [count, setCount] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const maxImages = 4;

  const handleFileSelected = () => {
    if (!maxImages || count < maxImages) {
      setCount((prev) => prev + 1);
    }
  };

  // 부모 컴포넌트에서 호출할 수 있는 reset 함수
  useImperativeHandle(ref, () => ({
    reset: () => {
      setCount(1);
      setResetKey((prev) => prev + 1); // key 변경으로 완전 리마운트
    },
  }));

  return (
    <>
      <p className="text-secondary text-sm">
        {maxImages
          ? `최대 ${maxImages}장까지 업로드 가능합니다.`
          : "이미지를 업로드하세요."}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <ImageInput
            key={`${resetKey}-${index}`}
            disabled={disabled}
            onFileSelected={
              index === count - 1 ? handleFileSelected : undefined
            }
          />
        ))}
      </div>
    </>
  );
}

export default ImageUploadForm;
