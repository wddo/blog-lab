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
  // 기존 데이터 정의
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
  const incrementSlot = (identifier: string, name: string) => {
    setSlots((prev) => {
      const newSlots = prev.map((slot) => {
        // 새로 추가한 이미지 name 업데이트
        return slot.id === identifier ? { ...slot, name } : slot;
      });

      // 이미지 최대 4장 이하일 때  "이미지 업로드" 슬롯 추가
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
      // "이미지 업로드" 제외한 슬롯 배열 생성
      const newSlots = [...prev.filter(({ name }) => name !== undefined)];
      newSlots.splice(index, 1);

      // "이미지 업로드" 슬롯 추가
      newSlots.push({
        id: crypto.randomUUID(),
        name: undefined,
      });

      return newSlots;
    });
  };

  const handleFileSelected = (identifier: string, name: string) => {
    incrementSlot(identifier, name);
  };

  const handleDelete = (identifier: string) => {
    decrementSlot(slots.findIndex((slot) => slot.id === identifier));
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
            identifier={slot.id}
            disabled={disabled}
            src={slot.name}
            onFileSelected={handleFileSelected}
            onDelete={() => handleDelete(slot.id)}
          />
        ))}
      </div>
    </>
  );
}

export default ImageUploadForm;
