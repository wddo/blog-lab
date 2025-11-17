import Image from "next/image";

type ImageListProps = {
  images?: string[];
};

function ImageList({ images }: ImageListProps) {
  return (
    <>
      {images ? (
        <div className="space-y-4 p-4">
          {images.map((url: string) => (
            <div key={url} className="relative aspect-video w-full">
              <div className="relative h-full w-full">
                <Image
                  src={url}
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
