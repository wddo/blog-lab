import BackButton from "@/components/blog/_internal/BackButton";
import ImageUploadFrom from "@/components/blog/image/ImageUploadForm";
import Button from "@/components/ui/button";
import Icon from "@/components/ui/Icon";
import { createPost } from "@/lib/blog/write/actions";

async function WritePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">새 글 작성</h1>
        <BackButton className="order-first flex items-center gap-2">
          <Icon name="back" size={16} />
        </BackButton>
      </div>
      <form className="flex flex-col gap-4" action={createPost}>
        <input
          name="title"
          placeholder="제목을 입력하세요"
          className="border-secondary w-full rounded border p-3"
        />

        <textarea
          name="content"
          placeholder="내용을 입력하세요"
          rows={15}
          className="border-secondary w-full resize-none rounded border p-3"
          required
        />

        <ImageUploadFrom />

        <div className="flex justify-end gap-2">
          <Button type="submit" variant="primary">
            작성하기
          </Button>
          <BackButton
            type="button"
            className="border-secondary hover:bg-tertiary-hover flex items-center gap-2 rounded-md border px-4 py-2"
          >
            취소
          </BackButton>
        </div>
      </form>
    </main>
  );
}

export default WritePage;
