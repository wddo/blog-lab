import { PostImage } from "@/types/blog";
import Image from "next/image";

function ImageList({ images }: { images: PostImage[] }) {
  return (
    <>
      {images ? (
        <div className="space-y-4 p-4">
          {images.map((image) => (
            <div key={image.image_url} className="relative aspect-video w-full">
              <div className="relative h-full w-full">
                <Image
                  src={image.image_url}
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
