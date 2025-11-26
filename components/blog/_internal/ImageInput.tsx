"use client";

import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { STORAGE_BUCKET_URL } from "@/data/constants";
import Image from "next/image";
import { ChangeEvent, HTMLAttributes, useEffect, useId, useState } from "react";

type ImageInputProps = {
  onFileSelected?: () => void;
  onDelete?: () => void;
  disabled: boolean;
  src?: string;
} & HTMLAttributes<HTMLDivElement>;

function ImageInput({
  onFileSelected,
  onDelete,
  className = "",
  disabled,
  src,
  ...props
}: ImageInputProps) {
  const [previousImage, setPreviousImage] = useState<string | undefined>(src);
  const [preview, setPreview] = useState<string | undefined>(
    src ? `${STORAGE_BUCKET_URL}/${src}` : undefined,
  );
  const id = useId();

  const hancleDelete = () => {
    setPreview(undefined);
    setPreviousImage(undefined);
    onDelete?.();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
      setPreviousImage(undefined); // 기존 이미지 정보 제거
      onFileSelected?.();
    }
  };

  // preview 메모리 정리
  useEffect(() => {
    const currentPreview = preview;
    return () => {
      if (currentPreview) {
        URL.revokeObjectURL(currentPreview);
      }
    };
  }, [preview]);

  return (
    <div className="relative" {...props}>
      {preview ? (
        <div className="absolute top-[-8px] right-[-8px] z-1">
          <Button
            variant="outline"
            className="rounded-full p-1"
            onClick={hancleDelete}
          >
            <Icon name="close" size={16} square={true} />
          </Button>
        </div>
      ) : null}
      <div
        className={`bg-tertiary hover:border-secondary text-secondary relative aspect-4/3 min-w-[100px] cursor-pointer gap-2 overflow-hidden rounded-md border border-transparent ${className}`}
      >
        <label
          htmlFor={id}
          className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2"
        >
          {preview ? (
            <div className="relative h-full w-full">
              <Image src={preview} alt="image" fill className="object-cover" />
            </div>
          ) : (
            <>
              <Icon name="image" size={16} />
              <span className="text-sm">이미지 업로드</span>
            </>
          )}
        </label>
        <input
          type="file"
          id={id}
          name="image"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={disabled}
        />
        <input
          type="hidden"
          name="previous-image"
          value={previousImage ?? ""}
        />
      </div>
    </div>
  );
}

export default ImageInput;
