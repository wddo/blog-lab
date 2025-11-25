import BackButton from "@/components/blog/_internal/BackButton";
import EditForm from "@/components/blog/EditForm";
import Icon from "@/components/ui/Icon";
import { getPost } from "@/lib/blog/post.actions";

type EditPageProps = {
  params: { id: string };
};

async function EditPage({ params }: EditPageProps) {
  const { id } = await params;

  const post = await getPost(id);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">글 수정</h1>
        <BackButton className="order-first flex items-center gap-2">
          <Icon name="back" size={16} />
        </BackButton>
      </div>
      <EditForm data={post} />
    </main>
  );
}

export default EditPage;
