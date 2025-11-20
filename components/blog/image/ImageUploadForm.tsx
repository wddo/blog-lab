"use client";
import ImageInput from "@/components/blog/_internal/ImageInput";
import { useState } from "react";

function ImageUploadFrom() {
  const [count, setCount] = useState(1);
  const maxImages = 4;

  const handleFileSelected = () => {
    if (!maxImages || count < maxImages) {
      setCount((prev) => prev + 1);
    }
  };

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
            key={index}
            onFileSelected={
              index === count - 1 ? handleFileSelected : undefined // 마지막 이미지일 때 추가 영역 노출
            }
          />
        ))}
      </div>
    </>
  );
}

export default ImageUploadFrom;
