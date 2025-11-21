import { STORAGE_BUCKET_URL } from "@/data/constants";
import { PostImage } from "@/types/blog";
import Image from "next/image";

function ImageList({ images }: { images: PostImage[] }) {
  return (
    <>
      {images ? (
        <div className="space-y-4 p-4">
          {images.map((image) => (
            <div
              key={image.image_name}
              className="relative aspect-video w-full"
            >
              <div className="relative h-full w-full">
                <Image
                  src={`${STORAGE_BUCKET_URL}/${image.image_name}`}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default ImageList;
