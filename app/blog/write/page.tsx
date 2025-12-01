import BackButton from "@/components/blog/_internal/BackButton";
import EditForm from "@/components/blog/EditForm";
import Icon from "@/components/ui/Icon";
import { createPost } from "@/lib/blog/post.actions";

async function WritePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">새 글 작성</h1>
        <BackButton className="order-first flex items-center gap-2">
          <Icon name="back" size={16} />
        </BackButton>
      </div>
      <EditForm action={createPost} />
    </main>
  );
}

export default WritePage;
