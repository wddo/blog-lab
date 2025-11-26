"use client";

import ImageInput from "@/components/blog/_internal/ImageInput";
import { PostImage } from "@/types/blog";
import { RefObject, useCallback, useImperativeHandle, useState } from "react";

export type ImageUploadFormHandle = {
  reset: () => void;
};

type Slot = {
  id: string;
  name: string | undefined;
};

type ImageUploadFromProps = {
  images?: PostImage[];
  disabled: boolean;
  ref: RefObject<ImageUploadFormHandle | null>;
};

function ImageUploadForm({ images, disabled, ref }: ImageUploadFromProps) {
  const maxImages = 4;
  const length = Math.min((images?.length || 0) + 1, maxImages);
  const initialSlots = useCallback(
    () =>
      Array.from({ length }).map((_, index) => ({
        id: crypto.randomUUID(),
        name: images?.[index]?.image_name ?? undefined,
      })),
    [images, length],
  );

  // 고정된 슬롯 배열 사용하여 부모 리렌더링에 file 데이터 유지
  // ( submit → 부모 disabled={pending} → 리렌더링 → 데이터 사라짐 )
  const [slots, setSlots] = useState<Slot[]>(initialSlots);

  // 슬롯 증가
  const incrementSlot = () => {
    setSlots((prev) => {
      const newSlots = [...prev];

      if (newSlots.length < maxImages) {
        newSlots.push({
          id: crypto.randomUUID(),
          name: undefined,
        });
      }

      return newSlots;
    });
  };

  // 슬롯 감소
  const decrementSlot = (index: number) => {
    setSlots((prev) => {
      const newSlots = [...prev.filter(({ name }) => name !== undefined)];
      newSlots.splice(index, 1);

      newSlots.push({
        id: crypto.randomUUID(),
        name: undefined,
      });

      return newSlots;
    });
  };

  const handleFileSelected = () => {
    incrementSlot();
  };

  const handleDelete = (index: number) => {
    decrementSlot(index);
  };

  // 부모 컴포넌트에서 호출할 수 있는 reset 함수
  useImperativeHandle(ref, () => ({
    reset: () => {
      setSlots(initialSlots());
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
        {slots.map((slot, index) => (
          <ImageInput
            key={slot.id} // ui 에서 이미지 삭제하고 추가하는 과정에서 충돌을 방지하기 위해 항상 고유 ID 사용
            disabled={disabled}
            src={slot.name}
            onFileSelected={handleFileSelected}
            onDelete={() => handleDelete(index)}
          />
        ))}
      </div>
    </>
  );
}

export default ImageUploadForm;
